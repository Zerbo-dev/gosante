"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Maximize2,
  Mic,
  MicOff,
  Minimize2,
  PhoneOff,
  ShieldCheck,
  UserRound,
  Video,
  VideoOff,
  Volume2,
} from "lucide-react";
import type { RealtimeChannel } from "@supabase/supabase-js";

function formatDuration(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

type Role = "host" | "guest";

type SignalPayload =
  | { type: "join"; role: Role; peerId: string }
  | { type: "hello"; role: Role; peerId: string }
  | { type: "sdp"; description: RTCSessionDescriptionInit; from: string }
  | { type: "ice"; candidate: RTCIceCandidateInit; from: string }
  | { type: "leave"; from: string };

const FALLBACK_ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun.cloudflare.com:3478" },
  {
    urls: [
      "turn:openrelay.metered.ca:80",
      "turn:openrelay.metered.ca:443",
      "turn:openrelay.metered.ca:443?transport=tcp",
    ],
    username: "openrelayproject",
    credential: "openrelayproject",
  },
];

export function VisioRoom({
  roomId,
  role,
  displayName,
  startWithVideoMuted = false,
  onLeave,
}: {
  roomId: string;
  role: Role;
  displayName: string;
  startWithVideoMuted?: boolean;
  onLeave?: () => void;
}) {
  const supabase = createClient();
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const iceServersRef = useRef<RTCIceServer[]>(FALLBACK_ICE_SERVERS);
  const peerIdRef = useRef(`${role}-${Math.random().toString(36).slice(2, 9)}`);
  const remotePeerRef = useRef<string | null>(null);
  // Négociation parfaite (perfect negotiation) : le guest est "polite"
  const politeRef = useRef(role === "guest");
  const makingOffer = useRef(false);
  const ignoreOffer = useRef(false);
  const pendingCandidates = useRef<RTCIceCandidateInit[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState("Initialisation…");
  const [error, setError] = useState<string | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(!startWithVideoMuted);
  const [connected, setConnected] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    if (!connected) return;
    const id = setInterval(() => setElapsed((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, [connected]);

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current?.requestFullscreen().catch(() => {});
    }
  }

  const send = useCallback((payload: SignalPayload) => {
    channelRef.current?.send({
      type: "broadcast",
      event: "signal",
      payload,
    });
  }, []);

  const playRemote = useCallback(() => {
    const el = remoteVideo.current;
    if (!el) return;
    el.muted = false;
    el.play()
      .then(() => setNeedsTap(false))
      .catch(() => {
        // Autoplay avec son bloqué (mobile) : on joue en muet et on
        // demande un geste utilisateur pour activer le son.
        el.muted = true;
        el.play().catch(() => {});
        setNeedsTap(true);
      });
  }, []);

  const destroyPc = useCallback(() => {
    const pc = pcRef.current;
    if (pc) {
      pc.onicecandidate = null;
      pc.ontrack = null;
      pc.onconnectionstatechange = null;
      pc.oniceconnectionstatechange = null;
      pc.onnegotiationneeded = null;
      pc.close();
    }
    pcRef.current = null;
    pendingCandidates.current = [];
    makingOffer.current = false;
    ignoreOffer.current = false;
  }, []);

  const ensurePc = useCallback(() => {
    if (pcRef.current) return pcRef.current;
    const pc = new RTCPeerConnection({
      iceServers: iceServersRef.current,
      bundlePolicy: "max-bundle",
      iceCandidatePoolSize: 4,
    });
    pcRef.current = pc;

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        send({
          type: "ice",
          candidate: e.candidate.toJSON(),
          from: peerIdRef.current,
        });
      }
    };

    pc.ontrack = (e) => {
      if (remoteVideo.current && e.streams[0]) {
        if (remoteVideo.current.srcObject !== e.streams[0]) {
          remoteVideo.current.srcObject = e.streams[0];
        }
        playRemote();
      }
      setConnected(true);
      setStatus("Connecté");
    };

    // Renégociation automatique (ajout de piste, ICE restart…)
    pc.onnegotiationneeded = async () => {
      try {
        makingOffer.current = true;
        await pc.setLocalDescription();
        if (pc.localDescription) {
          send({
            type: "sdp",
            description: pc.localDescription.toJSON(),
            from: peerIdRef.current,
          });
        }
      } catch {
        /* état transitoire, la prochaine négociation reprendra */
      } finally {
        makingOffer.current = false;
      }
    };

    pc.oniceconnectionstatechange = () => {
      // Reconnexion automatique : relance ICE (via TURN si besoin)
      if (pc.iceConnectionState === "failed") {
        setStatus("Reconnexion…");
        pc.restartIce();
      }
    };

    pc.onconnectionstatechange = () => {
      const state = pc.connectionState;
      if (state === "connected") {
        setConnected(true);
        setStatus("Connecté");
      } else if (state === "disconnected") {
        setStatus("Connexion instable — reconnexion…");
      } else if (state === "failed") {
        setConnected(false);
        setStatus("Reconnexion en cours…");
        pc.restartIce();
      }
    };

    const stream = localStreamRef.current;
    if (stream) {
      for (const track of stream.getTracks()) {
        pc.addTrack(track, stream);
      }
    }
    return pc;
  }, [send, playRemote]);

  // Réinitialise la connexion quand le pair (re)arrive avec un nouvel id
  // (rechargement de page, réseau changé…)
  const resetPcIfStale = useCallback(
    (newPeerId: string) => {
      const pc = pcRef.current;
      const peerChanged =
        remotePeerRef.current !== null && remotePeerRef.current !== newPeerId;
      const badState =
        pc &&
        (pc.connectionState === "failed" ||
          pc.connectionState === "closed" ||
          pc.connectionState === "disconnected");
      if (peerChanged || badState) {
        destroyPc();
        setConnected(false);
      }
      remotePeerRef.current = newPeerId;
    },
    [destroyPc]
  );

  useEffect(() => {
    let cancelled = false;

    async function start() {
      try {
        // 1. Serveurs ICE (STUN + TURN) — le TURN est indispensable sur
        // les réseaux mobiles (CGNAT) pour éviter les coupures.
        try {
          const res = await fetch("/api/turn", { cache: "no-store" });
          if (res.ok) {
            const data = (await res.json()) as { iceServers?: RTCIceServer[] };
            if (Array.isArray(data.iceServers) && data.iceServers.length > 0) {
              iceServersRef.current = data.iceServers;
            }
          }
        } catch {
          /* repli sur la liste statique */
        }
        if (cancelled) return;

        // 2. Caméra / micro
        setStatus("Accès caméra / micro…");
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
          video: startWithVideoMuted
            ? false
            : { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        localStreamRef.current = stream;
        if (localVideo.current) {
          localVideo.current.srcObject = stream;
        }
        if (startWithVideoMuted) setCamOn(false);

        // 3. Canal de signalisation
        const channel = supabase.channel(`visio:${roomId}`, {
          config: { broadcast: { self: false } },
        });
        channelRef.current = channel;

        channel.on("broadcast", { event: "signal" }, async ({ payload }) => {
          const msg = payload as SignalPayload;
          if (!msg) return;
          if ("from" in msg && msg.from === peerIdRef.current) return;
          if ("peerId" in msg && msg.peerId === peerIdRef.current) return;

          if (msg.type === "join" || msg.type === "hello") {
            resetPcIfStale(msg.peerId);
            setStatus(
              `${msg.role === "host" ? "Professionnel" : "Patient"} présent — connexion…`
            );
            if (msg.type === "join") {
              // Signale notre présence au pair qui vient d'arriver
              send({ type: "hello", role, peerId: peerIdRef.current });
            }
            // L'hôte initie (ou ré-initie) l'offre si pas déjà connecté
            if (role === "host") {
              const pc = ensurePc();
              if (pc.connectionState !== "connected") {
                if (pc.signalingState === "stable") {
                  try {
                    makingOffer.current = true;
                    await pc.setLocalDescription();
                    if (pc.localDescription) {
                      send({
                        type: "sdp",
                        description: pc.localDescription.toJSON(),
                        from: peerIdRef.current,
                      });
                    }
                  } finally {
                    makingOffer.current = false;
                  }
                } else if (pc.localDescription?.type === "offer") {
                  // Offre déjà émise avant l'arrivée du pair : on la renvoie
                  send({
                    type: "sdp",
                    description: pc.localDescription.toJSON(),
                    from: peerIdRef.current,
                  });
                }
              }
            }
            return;
          }

          if (msg.type === "sdp") {
            const pc = ensurePc();
            const description = msg.description;
            const offerCollision =
              description.type === "offer" &&
              (makingOffer.current || pc.signalingState !== "stable");
            ignoreOffer.current = !politeRef.current && offerCollision;
            if (ignoreOffer.current) return;

            try {
              await pc.setRemoteDescription(description);
            } catch {
              return;
            }

            // Vide la file des candidats arrivés trop tôt
            const queued = pendingCandidates.current.splice(0);
            for (const c of queued) {
              try {
                await pc.addIceCandidate(c);
              } catch {
                /* candidat obsolète */
              }
            }

            if (description.type === "offer") {
              await pc.setLocalDescription();
              if (pc.localDescription) {
                send({
                  type: "sdp",
                  description: pc.localDescription.toJSON(),
                  from: peerIdRef.current,
                });
              }
            }
            return;
          }

          if (msg.type === "ice") {
            const pc = ensurePc();
            if (!pc.remoteDescription) {
              // Candidat arrivé avant l'offre : on le garde pour plus tard
              pendingCandidates.current.push(msg.candidate);
              return;
            }
            try {
              await pc.addIceCandidate(msg.candidate);
            } catch {
              /* candidat obsolète ou lié à une offre ignorée */
            }
            return;
          }

          if (msg.type === "leave") {
            setConnected(false);
            setStatus("L'autre participant a quitté");
            destroyPc();
            remotePeerRef.current = null;
            if (remoteVideo.current) remoteVideo.current.srcObject = null;
          }
        });

        await channel.subscribe(async (state) => {
          if (state === "SUBSCRIBED") {
            setStatus(
              role === "host"
                ? "En attente du patient…"
                : "En attente du professionnel…"
            );
            // La connexion n'est créée qu'à l'arrivée du pair, pour ne
            // perdre aucun candidat ICE envoyé dans le vide.
            send({ type: "join", role, peerId: peerIdRef.current });
          } else if (state === "CHANNEL_ERROR" || state === "TIMED_OUT") {
            setStatus("Signal perdu — reconnexion…");
          }
        });
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "Impossible d'accéder à la caméra/micro. Autorisez l'accès dans le navigateur."
        );
        setStatus("Erreur");
      }
    }

    start();

    return () => {
      cancelled = true;
      send({ type: "leave", from: peerIdRef.current });
      channelRef.current?.unsubscribe();
      destroyPc();
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    };
  }, [
    roomId,
    role,
    startWithVideoMuted,
    supabase,
    send,
    ensurePc,
    destroyPc,
    resetPcIfStale,
  ]);

  function toggleMic() {
    const track = localStreamRef.current?.getAudioTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setMicOn(track.enabled);
  }

  async function toggleCam() {
    const stream = localStreamRef.current;
    if (!stream) return;
    const existing = stream.getVideoTracks()[0];
    if (existing) {
      existing.enabled = !existing.enabled;
      setCamOn(existing.enabled);
      return;
    }
    // Activation de la caméra après un démarrage anonyme :
    // la renégociation est automatique (onnegotiationneeded)
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      const track = videoStream.getVideoTracks()[0];
      stream.addTrack(track);
      const pc = pcRef.current;
      if (pc) pc.addTrack(track, stream);
      if (localVideo.current) localVideo.current.srcObject = stream;
      setCamOn(true);
    } catch {
      setError("Caméra inaccessible");
    }
  }

  function hangUp() {
    send({ type: "leave", from: peerIdRef.current });
    channelRef.current?.unsubscribe();
    destroyPc();
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    onLeave?.();
  }

  const otherLabel = role === "host" ? "Patient" : "Professionnel";

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-3xl bg-slate-950 shadow-2xl ring-1 ring-white/10"
    >
      {/* Zone vidéo principale — verticale sur mobile, 16:9 sur desktop */}
      <div
        className={`relative w-full bg-gradient-to-b from-slate-900 via-slate-950 to-black ${
          fullscreen
            ? "h-[100dvh]"
            : "h-[calc(100dvh-14.5rem)] min-h-[22rem] sm:h-auto sm:min-h-0 sm:aspect-video"
        }`}
      >
        <video
          ref={remoteVideo}
          autoPlay
          playsInline
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            connected ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* État d'attente */}
        {!connected && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
            <div className="relative">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
              <span className="absolute -inset-3 rounded-full border border-emerald-500/20" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-600/30 ring-1 ring-emerald-400/40">
                <UserRound className="h-9 w-9 text-emerald-300" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-base font-medium text-white">{status}</p>
              <p className="text-sm text-slate-400">
                La consultation démarrera dès que {otherLabel.toLowerCase()} aura rejoint la salle.
              </p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-400 ring-1 ring-white/10">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Appel chiffré de pair à pair
            </span>
          </div>
        )}

        {/* Activer le son (autoplay bloqué sur mobile) */}
        {connected && needsTap && (
          <button
            type="button"
            onClick={playRemote}
            className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl ring-2 ring-white/30 transition hover:bg-emerald-500"
          >
            <Volume2 className="h-5 w-5" />
            Toucher pour activer le son
          </button>
        )}

        {/* Bandeau supérieur */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 bg-gradient-to-b from-black/70 via-black/30 to-transparent p-3 sm:p-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                connected ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" : "animate-pulse bg-amber-400"
              }`}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{displayName}</p>
              <p className="truncate text-xs text-slate-300">
                {connected ? `En consultation avec ${otherLabel.toLowerCase()}` : status}
              </p>
            </div>
          </div>
          {connected && (
            <span className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-emerald-300 ring-1 ring-white/10 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              {formatDuration(elapsed)}
            </span>
          )}
        </div>

        {/* Vignette locale */}
        <div className="absolute bottom-24 right-3 sm:bottom-24 sm:right-4">
          <div className="relative h-32 w-24 overflow-hidden rounded-xl bg-slate-800 shadow-xl ring-2 ring-white/20 sm:h-32 sm:w-24 md:h-36 md:w-52">
            <video
              ref={localVideo}
              autoPlay
              playsInline
              muted
              className={`h-full w-full scale-x-[-1] object-cover ${camOn ? "" : "hidden"}`}
            />
            {!camOn && (
              <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-slate-400">
                <VideoOff className="h-5 w-5" />
                <span className="text-[10px]">Caméra coupée</span>
              </div>
            )}
            <span className="absolute bottom-1 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
              Vous
            </span>
            {!micOn && (
              <span className="absolute right-1 top-1 rounded-full bg-red-600 p-1">
                <MicOff className="h-3 w-3 text-white" />
              </span>
            )}
          </div>
        </div>

        {/* Barre de contrôles */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4">
          <div className="flex items-center gap-2 rounded-full bg-white/10 p-1.5 ring-1 ring-white/15 backdrop-blur-md sm:gap-3 sm:p-2">
            <button
              type="button"
              onClick={toggleMic}
              className={`flex h-11 w-11 items-center justify-center rounded-full transition sm:h-12 sm:w-12 ${
                micOn
                  ? "bg-white/15 text-white hover:bg-white/25"
                  : "bg-red-600 text-white hover:bg-red-500"
              }`}
              title={micOn ? "Couper le micro" : "Activer le micro"}
            >
              {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={toggleCam}
              className={`flex h-11 w-11 items-center justify-center rounded-full transition sm:h-12 sm:w-12 ${
                camOn
                  ? "bg-white/15 text-white hover:bg-white/25"
                  : "bg-red-600 text-white hover:bg-red-500"
              }`}
              title={camOn ? "Couper la caméra" : "Activer la caméra"}
            >
              {camOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="hidden h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:flex sm:h-12 sm:w-12"
              title={fullscreen ? "Quitter le plein écran" : "Plein écran"}
            >
              {fullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={hangUp}
              className="flex h-11 items-center justify-center gap-2 rounded-full bg-red-600 px-5 text-white transition hover:bg-red-500 sm:h-12 sm:px-6"
              title="Terminer l'appel"
            >
              <PhoneOff className="h-5 w-5" />
              <span className="hidden text-sm font-medium sm:inline">Quitter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Erreur */}
      {error && (
        <div className="border-t border-red-500/20 bg-red-950/60 px-4 py-3">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
}
