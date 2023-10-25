import { ZDK, TokensQueryInput, TokenInput } from "@zoralabs/zdk";
import { Chain, Network } from '@zoralabs/zdk/dist/queries/queries-sdk';
import Pool from "./classes/Pool";



type Helper = {
  findByAddress: (address: string) => void;
  convertIpfsImageUrl: (url: string) => string;
  getTokenMetadataFromZora: (pools: Pool[]) => any
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
  }


};



export default helper;
