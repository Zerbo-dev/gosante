const ENCODER = new TextEncoder();
const DECODER = new TextDecoder();
export const VAULT_MARKER = "gosante-journal-v1";
export const DEFAULT_ITERATIONS = 310_000;

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToBytes(value: string) {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

export function randomBase64(length = 16) {
  return bytesToBase64(crypto.getRandomValues(new Uint8Array(length)));
}

export async function deriveJournalKey(
  password: string,
  saltBase64: string,
  iterations = DEFAULT_ITERATIONS
) {
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    ENCODER.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: base64ToBytes(saltBase64),
      iterations,
      hash: "SHA-256",
    },
    passwordKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptJournalText(key: CryptoKey, value: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    ENCODER.encode(value)
  );
  return {
    encryptedContent: bytesToBase64(new Uint8Array(ciphertext)),
    iv: bytesToBase64(iv),
  };
}

export async function decryptJournalText(
  key: CryptoKey,
  encryptedContent: string,
  ivBase64: string
) {
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64ToBytes(ivBase64) },
    key,
    base64ToBytes(encryptedContent)
  );
  return DECODER.decode(decrypted);
}
