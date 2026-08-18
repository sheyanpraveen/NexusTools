import { describe, it, expect } from "vitest";
import {
  generatePassword,
  generateUUIDv4,
  encodeBase64,
  decodeBase64,
  encodeURL,
  decodeURL,
} from "../../src/lib/engines/crypto";

describe("Crypto & Security Engine", () => {
  it("generates passwords with specified options and entropy", () => {
    const pwd = generatePassword({
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      excludeLookalike: false,
    });
    expect(pwd.password.length).toBe(16);
    expect(pwd.entropyBits).toBeGreaterThan(80);
    expect(pwd.strength).toBe("Strong");
  });

  it("generates valid UUID v4 strings", () => {
    const uuid = generateUUIDv4();
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(regex.test(uuid)).toBe(true);
  });

  it("encodes and decodes Base64 UTF-8 strings accurately", () => {
    const original = "Hello World! 🚀 Привет мир 123";
    const encoded = encodeBase64(original);
    const decoded = decodeBase64(encoded);
    expect(decoded).toBe(original);
  });

  it("encodes and decodes URL strings accurately", () => {
    const original = "https://example.com/search?q=percentage calculator&lang=en";
    const encoded = encodeURL(original);
    const decoded = decodeURL(encoded);
    expect(decoded).toBe(original);
  });
});
