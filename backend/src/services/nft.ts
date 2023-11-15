import { EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";
import { poolsDummyArray } from "./dummydata";
import { Contract, ethers, Event } from "ethers";
import { PROHOBITION_ABI, PROHOBITION_ADDRESS } from "../utils";
import dotenv from "dotenv"
dotenv.config()
interface ProhobitionReturn {
  minter: string;
  numberOfMintsFrom15: number;
  homageMinter: boolean;
  tokenId: string[];
  block: number;
  txHash: string;
}

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


  /* This function queries the prohobition leaderboard for the following tokenids:
 Mental Entanglement: 231000xxx Example  https://prohibition.art/token/246000001
 Homage To Life: 246000xxx
 Creative Chaos: 186000xxx 

 For contract: 0x47a91457a3a1f700097199fd63c039c4784384ab
 */

  public static async getProhobitionContract() {
    const provider = new ethers.providers.JsonRpcProvider("https://arb-mainnet.g.alchemy.com/v2/" + process.env.ALCHEMY_API_KEY_ARB);
    const prohobitionContract = new Contract(PROHOBITION_ADDRESS, PROHOBITION_ABI, provider);
    return { prohobitionContract, provider }
  }

  public static async getNumberOfMintsAcrossThreeProhobition() {
    const tokenIdPrefixes = ['231000', '246000', '186000'];
    const { prohobitionContract } = await this.getProhobitionContract()
    const transferFilter = prohobitionContract.filters.Transfer("0x0000000000000000000000000000000000000000", null, null)
    //let fromBlockFirstIteration = 150533228 //Block as of 15th November 2023
    let fromBlockFirstIteration = 147568711 //testingBlock
    const transferEvents: Event[] = await prohobitionContract.queryFilter(transferFilter, fromBlockFirstIteration);
    console.log(`${transferEvents.length} events have been emitted by the contract ${PROHOBITION_ADDRESS}`);

    const destructMap = await Promise.all(transferEvents.map((transfer) => {
      return {
        minter: transfer?.args ? transfer.args.to || '0' : '0',
        tokenId: transfer?.args ? parseInt(transfer.args.tokenId._hex) : 0,
        block: transfer.blockNumber,
        txHash: transfer.transactionHash
      };
    }));

    const filterForTokenPrefixes = destructMap.filter((entry) =>
      tokenIdPrefixes.some((prefix) =>
        entry.tokenId.toString().startsWith(prefix)
      )
    );
    let homageMintersArray = await this.getHomageForLifeMinters()
    let mergedMintersArray = await this.mergeHomageMintersWith15thNovemberMinters(homageMintersArray, filterForTokenPrefixes)

    const sortedArr = mergedMintersArray.sort((a, b) => {
      // First, sort based on "homageMinter" (true comes first)
      if (a.homageMinter && !b.homageMinter) {
        return -1;
      } else if (!a.homageMinter && b.homageMinter) {
        return 1;
      } else {
        // If "homageMinter" is the same, sort based on "numberOfMintsFrom15"
        return b.numberOfMintsFrom15 - a.numberOfMintsFrom15;
      }
    });
    return sortedArr

  }


  public static async getHomageForLifeMinters(
  ) {

    let firstTransactionBlock = 147568711
    const { prohobitionContract, provider } = await this.getProhobitionContract()
    const transferFilter = prohobitionContract.filters.Transfer("0x0000000000000000000000000000000000000000", null, null)


    const transferEvents: Event[] = await prohobitionContract.queryFilter(transferFilter, firstTransactionBlock);
    console.log(`${transferEvents.length} HOMAGE events have been emitted by the contract ${PROHOBITION_ADDRESS}`);

    const destructMap = await Promise.all(transferEvents.map((transfer) => {
      return {
        minter: transfer?.args ? transfer.args.to || '0' : '0',
        tokenId: transfer?.args ? parseInt(transfer.args.tokenId._hex) : 0,
        block: transfer.blockNumber,
        txHash: transfer.transactionHash
      };
    }));

    const tokenIdPrefixes = ['246000'];//in this case only filter for Homage tokenids

    const filteredForHomage = destructMap.filter((entry) =>
      tokenIdPrefixes.some((prefix) =>
        entry.tokenId.toString().startsWith(prefix)
      )
    );

    return filteredForHomage

  }

  public static async mergeHomageMintersWith15thNovemberMinters(homageArray: any[], mintersFrom15November: any[]) {
    const mintersMap: Map<string, ProhobitionReturn> = new Map();
    const returnArray: ProhobitionReturn[] = [];

    // Process mintersFrom15November array
    mintersFrom15November.forEach((item) => {
      const minter = item.minter;

      if (!mintersMap.has(minter)) {
        mintersMap.set(minter, {
          minter,
          numberOfMintsFrom15: 1, // Initialize with 1 as the minter is found in mintersFrom15November
          homageMinter: false,
          tokenId: [item.tokenId],
          block: item.block,
          txHash: item.txHash,
        });
      } else {
        // Update the existing entry
        const existingEntry = mintersMap.get(minter)!;
        existingEntry.numberOfMintsFrom15++;
        existingEntry.tokenId.push(item.tokenId);
      }
    });

    // Process homageArray
    homageArray.forEach((item) => {
      const minter = item.minter;

      if (mintersMap.has(minter)) {
        mintersMap.get(minter)!.homageMinter = true;
        mintersMap.get(minter)!.tokenId.push(item.tokenId); // Add tokenId when updating the entry
      } else {
        mintersMap.set(minter, {
          minter,
          numberOfMintsFrom15: 0,
          homageMinter: true,
          tokenId: [item.tokenId],
          block: item.block,
          txHash: item.txHash,
        });
      }
    });

    returnArray.push(...Array.from(mintersMap.values()));
    return returnArray;
  }






}


