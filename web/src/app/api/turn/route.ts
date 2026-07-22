import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FALLBACK_ICE_SERVERS = [
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

/**
 * Retourne la liste des serveurs ICE pour WebRTC.
 * Si METERED_TURN_DOMAIN + METERED_TURN_API_KEY sont configurés (compte
 * gratuit sur metered.ca/stun-turn, 20 Go/mois), des identifiants TURN
 * frais et géo-routés sont récupérés — indispensable pour les réseaux
 * mobiles derrière CGNAT. Sinon, repli sur STUN + Open Relay statique.
 */
export async function GET() {
  const domain = process.env.METERED_TURN_DOMAIN;
  const apiKey = process.env.METERED_TURN_API_KEY;

  if (domain && apiKey) {
    try {
      const res = await fetch(
        `https://${domain}/api/v1/turn/credentials?apiKey=${apiKey}`,
        { cache: "no-store", signal: AbortSignal.timeout(5000) }
      );
      if (res.ok) {
        const servers = (await res.json()) as unknown[];
        if (Array.isArray(servers) && servers.length > 0) {
          return NextResponse.json({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }, ...servers],
          });
        }
      }
    } catch {
      // repli silencieux sur la liste statique
    }
  }

  return NextResponse.json({ iceServers: FALLBACK_ICE_SERVERS });
}
