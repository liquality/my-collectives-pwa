import { ZDK, TokensQueryInput, TokenInput } from "@zoralabs/zdk";
import { Chain, Network } from '@zoralabs/zdk/dist/queries/queries-sdk';



type Helper = {
  findByAddress: (address: string) => void;
  convertIpfsImageUrl: (url: string) => string;
  getTokenMetadataFromZora: (tokenIds: string[], contractAddresses: string[]) => any
};

const helper: Helper = {
  findByAddress: async (address: string) => {
    // Function implementation goes here
  },

  convertIpfsImageUrl: (url: string) => {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/')
  },

  getTokenMetadataFromZora: async (tokenIds: string[], contractAddresses: string[]) => {
    const API_ENDPOINT = "https://api.zora.co/graphql";
    const zdk = new ZDK({
      endpoint: API_ENDPOINT, networks: [
        {
          chain: Chain.Mainnet,
          network: Network.Ethereum,
        },
        {
          chain: Chain.ZoraMainnet,
          network: Network.Zora,
        },
      ],
    },); // Defaults to Ethereum Mainnet
    const tokensWithData = await zdk.tokens({
      where: {
        tokens: [{ tokenId: "1", address: "0x5aa959de99e0e49b8a85e0a630a74a7b757772b7" }]
      }
    })
    console.log(tokensWithData.tokens.nodes, 'tokenswith data')
    return tokensWithData
  },

};



export default helper;
