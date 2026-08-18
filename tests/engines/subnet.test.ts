import { describe, it, expect } from "vitest";
import { calculateSubnet, isValidIPv4 } from "../../src/lib/engines/subnet";

describe("Subnet Engine", () => {
  it("validates IPv4 addresses accurately", () => {
    expect(isValidIPv4("192.168.1.1")).toBe(true);
    expect(isValidIPv4("10.0.0.0")).toBe(true);
    expect(isValidIPv4("256.0.0.1")).toBe(false);
    expect(isValidIPv4("192.168.1")).toBe(false);
    expect(isValidIPv4("abc.def.ghi.jkl")).toBe(false);
  });

  it("calculates /24 subnet parameters accurately", () => {
    const res = calculateSubnet("192.168.1.55", 24);
    expect(res.subnetMask).toBe("255.255.255.0");
    expect(res.wildcardMask).toBe("0.0.0.255");
    expect(res.networkAddress).toBe("192.168.1.0");
    expect(res.broadcastAddress).toBe("192.168.1.255");
    expect(res.firstUsableHost).toBe("192.168.1.1");
    expect(res.lastUsableHost).toBe("192.168.1.254");
    expect(res.usableHosts).toBe(254);
    expect(res.totalHosts).toBe(256);
    expect(res.isPrivate).toBe(true);
    expect(res.ipClass).toBe("Class C");
  });

  it("calculates /30 point-to-point subnet correctly", () => {
    const res = calculateSubnet("10.0.0.1", 30);
    expect(res.subnetMask).toBe("255.255.255.252");
    expect(res.networkAddress).toBe("10.0.0.0");
    expect(res.broadcastAddress).toBe("10.0.0.3");
    expect(res.firstUsableHost).toBe("10.0.0.1");
    expect(res.lastUsableHost).toBe("10.0.0.2");
    expect(res.usableHosts).toBe(2);
    expect(res.isPrivate).toBe(true);
    expect(res.ipClass).toBe("Class A");
  });
});
