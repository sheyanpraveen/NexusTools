/**
 * Cryptographic & Utility Security Engine
 * Zero-leakage client-side execution
 */

export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeLookalike: boolean;
}

export interface PasswordResult {
  password: string;
  entropyBits: number;
  strength: "Very Weak" | "Weak" | "Moderate" | "Strong" | "Very Strong";
}

export function generatePassword(options: PasswordOptions): PasswordResult {
  let chars = "";
  if (options.includeUppercase) chars += options.excludeLookalike ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (options.includeLowercase) chars += options.excludeLookalike ? "abcdefghijkmnopqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz";
  if (options.includeNumbers) chars += options.excludeLookalike ? "23456789" : "0123456789";
  if (options.includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

  if (!chars) {
    chars = "abcdefghijklmnopqrstuvwxyz";
  }

  const length = Math.max(4, Math.min(128, options.length));
  let result = "";

  // Use cryptographic randomness if in browser or node crypto
  const array = new Uint32Array(length);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
  } else {
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  // Calculate entropy: E = L * log2(R)
  const poolSize = chars.length;
  const entropyBits = Math.round(length * (Math.log2(poolSize || 1)));

  let strength: PasswordResult["strength"] = "Very Weak";
  if (entropyBits >= 128) strength = "Very Strong";
  else if (entropyBits >= 80) strength = "Strong";
  else if (entropyBits >= 50) strength = "Moderate";
  else if (entropyBits >= 30) strength = "Weak";

  return {
    password: result,
    entropyBits,
    strength,
  };
}

export function generateUUIDv4(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function encodeBase64(text: string, urlSafe: boolean = false): string {
  try {
    const bytes = new TextEncoder().encode(text);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    let encoded = btoa(binary);
    if (urlSafe) {
      encoded = encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
    return encoded;
  } catch (err: any) {
    throw new Error("Failed to encode text to Base64: " + err.message);
  }
}

export function decodeBase64(base64: string): string {
  try {
    let clean = base64.trim().replace(/-/g, "+").replace(/_/g, "/");
    while (clean.length % 4) {
      clean += "=";
    }
    const binary = atob(clean);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch (err: any) {
    throw new Error("Invalid Base64 input string");
  }
}

export function encodeURL(text: string, componentMode: boolean = true): string {
  return componentMode ? encodeURIComponent(text) : encodeURI(text);
}

export function decodeURL(text: string, componentMode: boolean = true): string {
  return componentMode ? decodeURIComponent(text) : decodeURI(text);
}

// Client-side SHA-256 / SHA-512 with fallback
export async function computeHash(text: string, algorithm: "SHA-256" | "SHA-512" | "SHA-1"): Promise<string> {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  throw new Error("Web Crypto API is not supported in this environment");
}
