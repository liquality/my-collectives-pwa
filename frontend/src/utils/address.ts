export function shortenAddress(address: string) {
  const prefix = address.startsWith("0x") ? "0x" : "";
  const isTerra = address.startsWith("terra");
  return `${prefix}${address
    .replace("0x", "")
    .substring(0, prefix ? 4 : 6)}...${address.substring(
    isTerra ? address.length - 6 : address.length - 4
  )}`;
}
