import { ZDK, TokensQueryInput, TokenInput } from "@zoralabs/zdk";
import { Chain, Network } from "@zoralabs/zdk/dist/queries/queries-sdk";
import { Pool } from "../models/pool";

type Helper = {
  findByAddress: (address: string) => void;
  convertIpfsImageUrl: (url: string) => string;
};

const helper: Helper = {
  findByAddress: async (address: string) => {
    // Function implementation goes here
  },

  convertIpfsImageUrl: (url: string) => {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  },
};

export default helper;
