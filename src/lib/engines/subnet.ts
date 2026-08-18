/**
 * Subnet & CIDR Calculation Engine
 * Comprehensive IPv4 bitwise calculation and network analysis
 */

export interface SubnetResult {
  ipAddress: string;
  cidr: number;
  subnetMask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableHost: string;
  lastUsableHost: string;
  totalHosts: number;
  usableHosts: number;
  ipClass: string;
  isPrivate: boolean;
  binaryIp: string;
  binaryMask: string;
}

export function calculateSubnet(ip: string, cidrInput: number): SubnetResult {
  const cleanIp = ip.trim();
  const cidr = Math.max(0, Math.min(32, Math.floor(cidrInput)));

  if (!isValidIPv4(cleanIp)) {
    throw new Error("Invalid IPv4 address format (e.g. 192.168.1.1)");
  }

  const ipInt = ipToLong(cleanIp);
  const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const wildcardInt = ~maskInt >>> 0;

  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;

  const totalHosts = Math.pow(2, 32 - cidr);
  let usableHosts = 0;
  let firstUsableInt = 0;
  let lastUsableInt = 0;

  if (cidr === 31) {
    usableHosts = 2; // RFC 3021 point-to-point
    firstUsableInt = networkInt;
    lastUsableInt = broadcastInt;
  } else if (cidr === 32) {
    usableHosts = 1; // Single host
    firstUsableInt = networkInt;
    lastUsableInt = networkInt;
  } else {
    usableHosts = Math.max(0, totalHosts - 2);
    firstUsableInt = (networkInt + 1) >>> 0;
    lastUsableInt = (broadcastInt - 1) >>> 0;
  }

  const subnetMask = longToIp(maskInt);
  const wildcardMask = longToIp(wildcardInt);
  const networkAddress = longToIp(networkInt);
  const broadcastAddress = longToIp(broadcastInt);
  const firstUsableHost = longToIp(firstUsableInt);
  const lastUsableHost = longToIp(lastUsableInt);

  const ipOctets = cleanIp.split(".").map(Number);
  const firstOctet = ipOctets[0];

  let ipClass = "Class A";
  if (firstOctet >= 128 && firstOctet <= 191) ipClass = "Class B";
  else if (firstOctet >= 192 && firstOctet <= 223) ipClass = "Class C";
  else if (firstOctet >= 224 && firstOctet <= 239) ipClass = "Class D (Multicast)";
  else if (firstOctet >= 240) ipClass = "Class E (Experimental)";

  const isPrivate =
    (firstOctet === 10) ||
    (firstOctet === 172 && ipOctets[1] >= 16 && ipOctets[1] <= 31) ||
    (firstOctet === 192 && ipOctets[1] === 168) ||
    (firstOctet === 127); // Loopback

  return {
    ipAddress: cleanIp,
    cidr,
    subnetMask,
    wildcardMask,
    networkAddress,
    broadcastAddress,
    firstUsableHost,
    lastUsableHost,
    totalHosts,
    usableHosts,
    ipClass,
    isPrivate,
    binaryIp: ipToBinary(cleanIp),
    binaryMask: ipToBinary(subnetMask),
  };
}

export function isValidIPv4(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    if (!/^\d+$/.test(p)) return false;
    const num = Number(p);
    return num >= 0 && num <= 255;
  });
}

function ipToLong(ip: string): number {
  return ip
    .split(".")
    .reduce((acc, octet) => ((acc << 8) + parseInt(octet, 10)) >>> 0, 0);
}

function longToIp(long: number): string {
  return [
    (long >>> 24) & 255,
    (long >>> 16) & 255,
    (long >>> 8) & 255,
    long & 255,
  ].join(".");
}

function ipToBinary(ip: string): string {
  return ip
    .split(".")
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, "0"))
    .join(".");
}
