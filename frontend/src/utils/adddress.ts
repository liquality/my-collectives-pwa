import { ethers } from "ethers";
import { SimulateContractParameters } from "viem";

export function shortenAddress(address: string) {
  const _address = address || "";
  const prefix = _address.startsWith("0x") ? "0x" : "";
  const isTerra = _address.startsWith("terra");
  return `${prefix}${_address
    .replace("0x", "")
    .substring(0, prefix ? 4 : 5)}...${_address.substring(
      isTerra ? _address.length - 6 : _address.length - 4
    )}`;
}


export function handleDisplayAddress(address: string) {
  if (address.startsWith("0x")) {
    return shortenAddress(address)
  } else return address

}

export function convertIpfsImageUrl(url: string) {
  if (url) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  } else return "https://ionicframework.com/docs/img/demos/avatar.svg";
}


export const cutOffTooLongString = (name: string, maxLength: number) => {
  if (name && name?.length <= maxLength) {
    return name;
  } else {
    return name?.slice(0, maxLength) + ' ...';
  }
};

export const handleCopyClick = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      //("Text copied to clipboard: ", text);
    })
    .catch((error) => {
      console.error("Failed to copy text: ", error);
    });
};

export function convertDateToReadable(expiration: Date | string): string {
  const expirationDate = typeof expiration === 'string' ? new Date(expiration) : expiration;

  const now = new Date();
  const timeDifference = expirationDate.getTime() - now.getTime();

  // Convert milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} left`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} left`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} left`;
  } else {
    return `${seconds} second${seconds === 1 ? '' : 's'} left`;
  }
}

export const displayPrice = (floorPrice: string, params?: SimulateContractParameters) => {
  if (params?.value) {
    const ethValue = ethers.utils.formatEther(params.value);
    return ethValue;
  } else return floorPrice;
};


