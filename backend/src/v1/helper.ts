import { ZDK, TokensQueryInput, TokenInput } from "@zoralabs/zdk";
import { Chain, Network } from '@zoralabs/zdk/dist/queries/queries-sdk';
import Pool from "./classes/Pool";
import { Contract, ethers } from "ethers";
import { ZORA_REWARDS_ABI, ZORA_REWARDS_CONTRACT_ADDRESS } from "./constants";



type Helper = {
  findByAddress: (address: string) => void;
  convertIpfsImageUrl: (url: string) => string;
  getTokenMetadataFromZora: (pools: Pool[]) => any
  getPoolMintEvents: (startBlock: any, endBlock: any) => any
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
  getPoolMintEvents: async (startBlock: any, endBlock: any) => {
    startBlock = 2384107 //when contract was deployed
    endBlock = 5946998 //last interacted balance update
    const PROVIDER = new ethers.providers.JsonRpcProvider("https://rpc.zora.energy"); //TODO: try with a base contract
    console.log(PROVIDER.formatter.filter, 'PROVIDERS')

    const zoraContract = new Contract(ZORA_REWARDS_CONTRACT_ADDRESS, ZORA_REWARDS_ABI, PROVIDER);

    console.log(zoraContract, 'ZORA CONTRACT')
    const rewardFilter = zoraContract.filters.RewardsDeposit();
    console.log("Querying the Mint events...", rewardFilter);
    const rewardEvent = await zoraContract.queryFilter(
      rewardFilter,
      startBlock,
      endBlock
    );
    console.log(
      `${rewardEvent.length} have been emitted by the pool with id ${ZORA_REWARDS_CONTRACT_ADDRESS} between blocks ${startBlock} & ${endBlock}`
    );
    return rewardEvent;
  },





};



export default helper;
