/** Identifiants de salle visio GoSanté (WebRTC via Supabase Realtime) */

export function createJitsiRoomId(prefix = "GoSante"): string {
  const rand = Math.random().toString(36).slice(2, 10);
  return `${prefix}-${Date.now().toString(36)}-${rand}`;
}

/** @deprecated meet.jit.si exige un login hôte — utiliser VisioRoom */
export function buildJitsiUrl(opts: {
  room: string;
  displayName: string;
  anonymous: boolean;
}): string {
  const { room, displayName, anonymous } = opts;
  const params = new URLSearchParams({
    "userInfo.displayName": displayName,
    "config.startWithVideoMuted": anonymous ? "true" : "false",
    "config.startWithAudioMuted": "false",
    "config.prejoinConfig.enabled": "false",
    "config.disableDeepLinking": "true",
  });
  return `https://meet.jit.si/${encodeURIComponent(room)}#${params.toString()}`;
}

export const JITSI_DOMAIN = "meet.jit.si";
