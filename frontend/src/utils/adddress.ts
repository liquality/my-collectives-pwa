export function shortenAddress(address: string) {
  const _address = address || "";
  const prefix = _address.startsWith("0x") ? "0x" : "";
  const isTerra = _address.startsWith("terra");
  return `${prefix}${_address
    .replace("0x", "")
    .substring(0, prefix ? 2 : 3)}...${_address.substring(
      isTerra ? _address.length - 6 : _address.length - 4
    )}`;
}

export function convertIpfsImageUrl(url: string) {
  if (url) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  } else return "https://ionicframework.com/docs/img/demos/avatar.svg";
}


export const cutOffTooLongString = (name: string, maxLength: number) => {
  if (name.length <= maxLength) {
    return name;
  } else {
    return name.slice(0, maxLength) + ' ...';
  }
};