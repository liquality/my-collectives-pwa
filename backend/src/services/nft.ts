import { EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";
import dotenv from "dotenv";
import { poolsDummyArray } from "./dummydata";

export class NFTService {
  public static async getTokenMetadata() {
    const chain = EvmChain.ETHEREUM;
    const metadataPromises = poolsDummyArray.map(async (pool) => {
      const response = await Moralis.EvmApi.nft.getNFTMetadata({
        chain: chain,
        format: "decimal",
        normalizeMetadata: true,
        mediaItems: false,
        address: pool.contractAddress,
        tokenId: pool.tokenId.toString(),
      });
      return response?.toJSON();
    });

    const metadataResults = await Promise.all(metadataPromises);
    console.log(metadataResults);
    return metadataResults;
  }

  public static async getLeaderboard(contractAddress: string, tokenId: string) {
    const chain = EvmChain.ETHEREUM;

    const response = await Moralis.EvmApi.nft.getNFTTokenIdOwners({
      chain: "0x1",
      format: "decimal",
      address: contractAddress,
      tokenId: tokenId,
    });
    console.log(response);

    return response.toJSON();
  }

  
}
