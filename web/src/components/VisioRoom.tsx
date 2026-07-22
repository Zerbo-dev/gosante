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

/** STUN + TURN publics ; turns:443 (TLS) est crucial derrière Safari / réseaux Apple. */
const FALLBACK_ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun.cloudflare.com:3478" },
  {
    urls: [
      "turn:openrelay.metered.ca:80",
      "turn:openrelay.metered.ca:443",
      "turn:openrelay.metered.ca:443?transport=tcp",
      "turns:openrelay.metered.ca:443",
      "turns:openrelay.metered.ca:443?transport=tcp",
    ],
    username: "openrelayproject",
    credential: "openrelayproject",
  },
];

function serializeDescription(
  desc: RTCSessionDescription | RTCSessionDescriptionInit
): RTCSessionDescriptionInit {
  return { type: desc.type, sdp: desc.sdp };
}

function serializeCandidate(candidate: RTCIceCandidate): RTCIceCandidateInit {
  try {
    return candidate.toJSON();
  } catch {
    return {
      candidate: candidate.candidate,
      sdpMid: candidate.sdpMid,
      sdpMLineIndex: candidate.sdpMLineIndex,
      usernameFragment: candidate.usernameFragment,
    };
  }
}

/**
 * Safari / iOS : contraintes audio trop agressives (surtout autoGainControl)
 * provoquent souvent des crissements. On reste simple, puis on affine.
 */
async function acquireMedia(startWithVideoMuted: boolean): Promise<MediaStream> {
  const isSafari =
    typeof navigator !== "undefined" &&
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // Sur Safari : audio minimal (l'AEC navigateur suffit mieux que la pile AGC+NS)
  const audioConstraints: boolean | MediaTrackConstraints = isSafari
    ? true
    : {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: false,
      };

  async function withAudio(
    video: boolean | MediaTrackConstraints
  ): Promise<MediaStream> {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: audioConstraints,
      video,
    });
    // Affiner après coup si le navigateur le permet (sans bloquer)
    for (const track of stream.getAudioTracks()) {
      try {
        await track.applyConstraints({
          echoCancellation: true,
          noiseSuppression: isSafari ? false : true,
          autoGainControl: false,
        });
      } catch {
        /* contraintes non supportées */
      }
    }
    return stream;
  }

  if (startWithVideoMuted) {
    return withAudio(false);
  }

  const videoAttempts: Array<boolean | MediaTrackConstraints> = [
    { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
    { facingMode: "user" },
    true,
  ];

  let lastError: unknown;
  for (const video of videoAttempts) {
    try {
      return await withAudio(video);
    } catch (e) {
      lastError = e;
    }
  }

  try {
    return await withAudio(false);
  } catch {
    throw lastError instanceof Error
      ? lastError
      : new Error(
          "Impossible d'accéder à la caméra/micro. Sur iPhone/iPad, autorisez l'accès dans Réglages → Safari → Caméra / Microphone."
        );
  }
}

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
  // Négociation parfaite : le guest est "polite"
  const politeRef = useRef(role === "guest");
  const makingOffer = useRef(false);
  const ignoreOffer = useRef(false);
  const pendingCandidates = useRef<RTCIceCandidateInit[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  const [status, setStatus] = useState("Prêt à démarrer");
  const [error, setError] = useState<string | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(!startWithVideoMuted);
  const [connected, setConnected] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  // Sur Safari/iOS, getUserMedia doit être déclenché par un geste utilisateur.
  const [mediaReady, setMediaReady] = useState(false);
  const [starting, setStarting] = useState(false);

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

  // Après l'écran de démarrage, le <video> local n'existe qu'au rendu suivant :
  // on y rattache le flux ici (sinon aperçu local vide sur Apple / partout).
  useEffect(() => {
    if (!mediaReady) return;
    const el = localVideo.current;
    const stream = localStreamRef.current;
    if (!el || !stream) return;
    el.muted = true;
    el.defaultMuted = true;
    el.volume = 0;
    el.setAttribute("playsinline", "true");
    el.setAttribute("webkit-playsinline", "true");
    if (el.srcObject !== stream) {
      el.srcObject = stream;
    }
    void el.play().catch(() => {});
  }, [mediaReady, camOn]);

  function toggleFullscreen() {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
      return;
    }
    // iOS Safari : fullscreen API limitée — on tente webkit si besoin
    const anyEl = el as HTMLElement & {
      webkitRequestFullscreen?: () => void;
    };
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else {
      anyEl.webkitRequestFullscreen?.();
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
    el.setAttribute("playsinline", "true");
    el.setAttribute("webkit-playsinline", "true");
    // Ne jamais laisser le flux distant démarrer en boucle de play() concurrente
    if (!el.paused && !el.muted && el.srcObject) {
      setNeedsTap(false);
      return;
    }
    el.muted = false;
    const p = el.play();
    if (p && typeof p.then === "function") {
      p.then(() => setNeedsTap(false)).catch(() => {
        el.muted = true;
        el.play().catch(() => {});
        setNeedsTap(true);
      });
    }
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

  /** createOffer/Answer explicites — plus fiable que setLocalDescription() sans arg sur Safari. */
  const createAndSendOffer = useCallback(
    async (pc: RTCPeerConnection) => {
      makingOffer.current = true;
      try {
        const offer = await pc.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        });
        await pc.setLocalDescription(offer);
        if (pc.localDescription) {
          send({
            type: "sdp",
            description: serializeDescription(pc.localDescription),
            from: peerIdRef.current,
          });
        }
      } finally {
        makingOffer.current = false;
      }
    },
    [send]
  );

  const ensurePc = useCallback(() => {
    if (pcRef.current) return pcRef.current;
    const pc = new RTCPeerConnection({
      iceServers: iceServersRef.current,
      bundlePolicy: "max-bundle",
      // iceCandidatePoolSize omis : bug connu sur certaines versions Safari
    });
    pcRef.current = pc;

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        send({
          type: "ice",
          candidate: serializeCandidate(e.candidate),
          from: peerIdRef.current,
        });
      }
    };

    pc.ontrack = (e) => {
      const el = remoteVideo.current;
      if (!el) return;

      // Safari peut envoyer audio et vidéo en événements séparés :
      // on accumule les pistes sur un seul MediaStream (évite coupures / grésillements).
      if (e.streams[0]) {
        if (el.srcObject !== e.streams[0]) {
          el.srcObject = e.streams[0];
        }
      } else {
        let remote = el.srcObject as MediaStream | null;
        if (!(remote instanceof MediaStream)) {
          remote = new MediaStream();
          el.srcObject = remote;
        }
        if (!remote.getTracks().some((t) => t.id === e.track.id)) {
          remote.addTrack(e.track);
        }
      }
      playRemote();
      setConnected(true);
      setStatus("Connecté");
    };

    pc.onnegotiationneeded = async () => {
      try {
        if (pc.signalingState !== "stable") return;
        await createAndSendOffer(pc);
      } catch {
        /* état transitoire */
      }
    };

    pc.oniceconnectionstatechange = () => {
      if (pc.iceConnectionState === "failed") {
        setStatus("Reconnexion…");
        try {
          pc.restartIce();
        } catch {
          /* Safari ancien */
        }
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
        try {
          pc.restartIce();
        } catch {
          /* ignore */
        }
      }
    };

    const stream = localStreamRef.current;
    if (stream) {
      for (const track of stream.getTracks()) {
        pc.addTrack(track, stream);
      }
    }
    return pc;
  }, [send, playRemote, createAndSendOffer]);

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

  /** Appelé depuis un clic — requis Safari/iOS pour caméra/micro. */
  async function startMediaAndCall() {
    if (startedRef.current || starting) return;
    setStarting(true);
    setError(null);
    try {
      if (!window.isSecureContext) {
        throw new Error(
          "Safari exige une connexion sécurisée (HTTPS) pour la caméra et le micro."
        );
      }
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Ce navigateur ne prend pas en charge la visioconférence. Sur iPhone, utilisez Safari à jour."
        );
      }

      setStatus("Préparation des serveurs…");
      try {
        const res = await fetch("/api/turn", { cache: "no-store" });
        if (res.ok) {
          const data = (await res.json()) as { iceServers?: RTCIceServer[] };
          if (Array.isArray(data.iceServers) && data.iceServers.length > 0) {
            iceServersRef.current = data.iceServers;
          }
        }
      } catch {
        /* repli liste statique */
      }

      setStatus("Accès caméra / micro…");
      const stream = await acquireMedia(startWithVideoMuted);
      localStreamRef.current = stream;
      // Le <video> local n'est monté qu'après setMediaReady — rattachement via useEffect
      const hasVideo = stream.getVideoTracks().length > 0;
      setCamOn(hasVideo && !startWithVideoMuted);
      if (!hasVideo && !startWithVideoMuted) {
        setStatus("Caméra indisponible — audio uniquement");
      }

      startedRef.current = true;
      setMediaReady(true);
    } catch (e) {
      const msg =
        e instanceof Error
          ? e.message
          : "Impossible d'accéder à la caméra/micro.";
      const name = e instanceof DOMException ? e.name : "";
      if (name === "NotAllowedError" || /permission|denied|not allowed/i.test(msg)) {
        setError(
          "Accès caméra/micro refusé. Sur iPhone/iPad : Réglages → Safari → Caméra et Microphone → Autoriser, puis réessayez."
        );
      } else if (name === "NotFoundError") {
        setError("Aucune caméra ou micro détecté sur cet appareil.");
      } else {
        setError(msg);
      }
      setStatus("Erreur");
    } finally {
      setStarting(false);
    }
  }

  // Signalisation + WebRTC uniquement après autorisation média (geste utilisateur)
  useEffect(() => {
    if (!mediaReady) return;
    let cancelled = false;

    async function connectSignaling() {
      try {
        setStatus(
          role === "host" ? "En attente du patient…" : "En attente du professionnel…"
        );

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
              send({ type: "hello", role, peerId: peerIdRef.current });
            }
            if (role === "host") {
              const pc = ensurePc();
              if (pc.connectionState !== "connected") {
                if (pc.signalingState === "stable") {
                  try {
                    await createAndSendOffer(pc);
                  } catch {
                    /* ignore */
                  }
                } else if (pc.localDescription?.type === "offer") {
                  send({
                    type: "sdp",
                    description: serializeDescription(pc.localDescription),
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

            const queued = pendingCandidates.current.splice(0);
            for (const c of queued) {
              try {
                await pc.addIceCandidate(c);
              } catch {
                /* candidat obsolète */
              }
            }

            if (description.type === "offer") {
              try {
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                if (pc.localDescription) {
                  send({
                    type: "sdp",
                    description: serializeDescription(pc.localDescription),
                    from: peerIdRef.current,
                  });
                }
              } catch {
                /* ignore */
              }
            }
            return;
          }

          if (msg.type === "ice") {
            const pc = ensurePc();
            if (!pc.remoteDescription) {
              pendingCandidates.current.push(msg.candidate);
              return;
            }
            try {
              await pc.addIceCandidate(msg.candidate);
            } catch {
              /* ignore */
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
          if (cancelled) return;
          if (state === "SUBSCRIBED") {
            setStatus(
              role === "host"
                ? "En attente du patient…"
                : "En attente du professionnel…"
            );
            send({ type: "join", role, peerId: peerIdRef.current });
          } else if (state === "CHANNEL_ERROR" || state === "TIMED_OUT") {
            setStatus("Signal perdu — reconnexion…");
          }
        });
      } catch (e) {
        if (cancelled) return;
        setError(
          e instanceof Error ? e.message : "Erreur de connexion à la salle."
        );
        setStatus("Erreur");
      }
    }

    connectSignaling();

    return () => {
      cancelled = true;
      send({ type: "leave", from: peerIdRef.current });
      channelRef.current?.unsubscribe();
      channelRef.current = null;
      destroyPc();
    };
  }, [
    mediaReady,
    roomId,
    role,
    supabase,
    send,
    ensurePc,
    destroyPc,
    resetPcIfStale,
    createAndSendOffer,
  ]);

  useEffect(() => {
    return () => {
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    };
  }, []);

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
      setError("Caméra inaccessible sur cet appareil.");
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

  // Écran d'entrée — geste utilisateur obligatoire (Safari / iOS)
  if (!mediaReady) {
    return (
      <div className="overflow-hidden rounded-3xl bg-slate-950 shadow-2xl ring-1 ring-white/10">
        <div className="flex min-h-[22rem] flex-col items-center justify-center gap-5 px-6 py-12 text-center sm:aspect-video sm:min-h-0">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-600/30 ring-1 ring-emerald-400/40">
            <Video className="h-9 w-9 text-emerald-300" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-white">Prêt pour la consultation</p>
            <p className="max-w-md text-sm text-slate-400">
              Sur iPhone et iPad, Safari demande votre autorisation caméra / micro
              au moment du démarrage. Appuyez ci-dessous pour lancer l&apos;appel.
            </p>
          </div>
          <button
            type="button"
            onClick={startMediaAndCall}
            disabled={starting}
            className="flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-500 disabled:opacity-60"
          >
            <Video className="h-5 w-5" />
            {starting ? "Démarrage…" : "Activer caméra / micro et rejoindre"}
          </button>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            Appel chiffré de pair à pair · {displayName}
          </span>
          {error && (
            <p className="max-w-md rounded-xl bg-red-950/60 px-4 py-3 text-sm text-red-300 ring-1 ring-red-500/20">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-3xl bg-slate-950 shadow-2xl ring-1 ring-white/10"
    >
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
                La consultation démarrera dès que {otherLabel.toLowerCase()} aura
                rejoint la salle.
              </p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-400 ring-1 ring-white/10">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Appel chiffré de pair à pair
            </span>
          </div>
        )}

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

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 bg-gradient-to-b from-black/70 via-black/30 to-transparent p-3 sm:p-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                connected
                  ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
                  : "animate-pulse bg-amber-400"
              }`}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{displayName}</p>
              <p className="truncate text-xs text-slate-300">
                {connected
                  ? `En consultation avec ${otherLabel.toLowerCase()}`
                  : status}
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

        <div className="absolute bottom-24 right-3 sm:bottom-24 sm:right-4">
          <div className="relative h-32 w-24 overflow-hidden rounded-xl bg-slate-800 shadow-xl ring-2 ring-white/20 sm:h-32 sm:w-24 md:h-36 md:w-52">
            <video
              ref={localVideo}
              autoPlay
              playsInline
              muted
              defaultMuted
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

      {error && (
        <div className="border-t border-red-500/20 bg-red-950/60 px-4 py-3">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}
      {connected && (
        <div className="border-t border-white/5 bg-slate-900/80 px-4 py-2">
          <p className="text-center text-[11px] text-slate-400">
            Conseil : utilisez des écouteurs pour éviter l&apos;écho et les crissements
            (le micro capte sinon le haut-parleur).
          </p>
        </div>
      )}
    </div>
  );
}
