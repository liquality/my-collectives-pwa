import { ZDK, TokensQueryInput, TokenInput } from "@zoralabs/zdk";
import { Chain, Network } from '@zoralabs/zdk/dist/queries/queries-sdk';
import Pool from "./classes/Pool";
import { Contract, ethers, Event } from "ethers";
import { BASE_GOERLI_MINT_ABI, BASE_GOERLI_MINT_CONTRACT_ADDRESS, ZORA_REWARDS_ABI, ZORA_REWARDS_CONTRACT_ADDRESS } from "./constants";
import dotenv from "dotenv"
dotenv.config()

interface ReturnObject {
  minter: string;
  numberOfMints: number;
}
const ZORA_RPC = "https://rpc.zora.energy"
const BASE_GOERLI_RPC = "https://base-goerli.g.alchemy.com/v2/"
type Helper = {
  findByAddress: (address: string) => void;
  convertIpfsImageUrl: (url: string) => string;
  getTokenMetadataFromZora: (pools: Pool[]) => any
  getZoraLeaderboardEvents: () => any
  processLogEntriesForZoraLeaderboard: (logEntries: Event[]) => Promise<ReturnObject[]>
};

const helper: Helper = {
  findByAddress: async (address: string) => {
    // Function implementation goes here
  },

  convertIpfsImageUrl: (url: string) => {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/')
  },
  getTokenMetadataFromZora: async (pools: Pool[]) => {
    const API_ENDPOINT = "https://api.zora.co/graphql";
    const zdk = new ZDK({
      endpoint: API_ENDPOINT,
      networks: [
        {
          chain: Chain.Mainnet,
          network: Network.Ethereum,
        },
        {
          chain: Chain.ZoraMainnet,
          network: Network.Zora,
        },
      ],
    });

    const tokensWithData = await zdk.tokens({
      where: {
        tokens: pools.map((pool) => ({ tokenId: pool.token_id || "", address: pool.minting_contract_address || "" }))
      }
    });


    const formattedData = tokensWithData.tokens.nodes.map((token) => ({
      name: token.token.name,
      imageUrl: token.token.image?.url ?? "",
      collectionAddress: token.token.collectionAddress,
      tokenId: token.token.tokenId,

    }));

    return formattedData;
  },

  //zora contract on OP: https://zora.co/collect/oeth:0x31f88a359a045aba182a3e1d05ceaa5a5b0f5912/0
  //https://coinsbench.com/fetching-historical-events-from-a-smart-contract-f1c974ccd24d
  getZoraLeaderboardEvents: async () => {
    const PROVIDER = new ethers.providers.JsonRpcProvider(BASE_GOERLI_RPC + process.env.ALCHEMY_API_KEY_RPC); //TODO: try with a base contract
    const zoraContract = new Contract(BASE_GOERLI_MINT_CONTRACT_ADDRESS, BASE_GOERLI_MINT_ABI, PROVIDER);
    const transferFilter = zoraContract.filters.Transfer();
    const rewardEvent: Event[] = await zoraContract.queryFilter(transferFilter);
    console.log(
      `${rewardEvent.length} events have been emitted by the contract with address ${BASE_GOERLI_MINT_CONTRACT_ADDRESS}`
    );
    const processedEntries = await helper.processLogEntriesForZoraLeaderboard(rewardEvent);
    return processedEntries;
  },



  processLogEntriesForZoraLeaderboard: async (logEntries: Event[]): Promise<ReturnObject[]> => {
    const returnObject: ReturnObject[] = [];
    // Create a map to store the counts of each minter
    const minterCountMap: { [minter: string]: number } = {};

    for (const logEntry of logEntries) {
      const [zeroAddressIfMint, minter, { hex }] = logEntry.args || "";
      if (minter && zeroAddressIfMint) {
        if (zeroAddressIfMint === "0x0000000000000000000000000000000000000000") {
          // Increment the count for the corresponding value
          minterCountMap[minter] = (minterCountMap[minter] || 0) + 1;
        }
      }
    }

    for (const minter in minterCountMap) {
      returnObject.push({
        minter,
        numberOfMints: minterCountMap[minter],
      });
    }

    return returnObject.sort((a, b) => b.numberOfMints - a.numberOfMints);
  }

};



export default helper;
