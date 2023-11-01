

import { EvmChain } from "@moralisweb3/common-evm-utils";
import { Request, Response } from "express";
import Moralis from "moralis";

import { poolsDummyArray } from "../dummydata";
import axios from "axios";
import helper from "../helper";
import { sendGraphQLQuery } from "./soundHelper";
import { getZoraLeaderboardEvents } from "./zoraHelper";


const moralisHandler = {

  getTokenMetadata: async (req: Request, res: Response) => {
    console.log(req.body, 'req body in moralis');

    try {
      const chain = EvmChain.ETHEREUM;
      const metadataPromises = poolsDummyArray.map(async (pool) => {
        const response = await Moralis.EvmApi.nft.getNFTMetadata({
          "chain": chain,
          "format": "decimal",
          "normalizeMetadata": true,
          "mediaItems": false,
          "address": pool.contractAddress,
          "tokenId": pool.tokenId.toString(),
        });
        return response?.toJSON();
      });

      const metadataResults = await Promise.all(metadataPromises);
      console.log(metadataResults);

      res.status(200).send(metadataResults);
    } catch (err) {
      console.error(err, 'Error in moralis handler');
      res.status(500).send({ error: 'An error occurred' });
    }
  },


  getLeaderboard: async (req: Request, res: Response) => {

    try {
      const chain = EvmChain.ETHEREUM;

      const response = await Moralis.EvmApi.nft.getNFTTokenIdOwners({
        "chain": "0x1",
        "format": "decimal",
        "address": req.params.contractAddress,
        "tokenId": req.params.tokenId,
      });
      console.log(response);

      res.status(200).send(response.toJSON());
    } catch (err) {
      console.error(err, 'Error in moralis handler');
      res.status(500).send({ error: 'An error occurred' });
    }
  },


  getLeaderboardForSound: async (req: Request, res: Response) => {
    const contractAddress = req.params.contractAddress
    try {
      const getReleaseIdQuery = `query ApiExplorer {
           releaseFromContract(contractAddress: "${contractAddress}") {
             id
           }
         }`;

      const releaseId = await sendGraphQLQuery(getReleaseIdQuery)
      const { id } = releaseId?.data?.releaseFromContract;

      const getMinterCountQuery = `query ApiExplorer {
        release(id: "${id}") {
        collectors {
          pageInfo {
            hasNextPage
            startCursor
            hasPreviousPage
          }
          edges {
            node {
              nftsCount
             user{
              publicAddress
            }
            }
          }
        }
      }
    }`;

      const minterCount = await sendGraphQLQuery(getMinterCountQuery)
      const { collectors } = minterCount?.data?.release;
      const nodesArray = collectors.edges.map((edge: any) => edge.node);
      const renamedArray = nodesArray.map((item: any) => ({
        'minter': item.user.publicAddress,
        'numberOfMints': item.nftsCount,
        'topContributor': 'Coming soon'
      }));

      res.status(200).send(renamedArray);
    } catch (err) {
      console.error(err, 'Error in sound leaderboard');
      res.status(500).json({ error: 'An error occurred for Sound Leaderboard' });
    }
  },


  getLeaderboardForZora: async (req: Request, res: Response) => {
    const contractAddress = req.params.contractAddress

    try {
      const rewards = await getZoraLeaderboardEvents(contractAddress)
      res.status(200).json(rewards);
    } catch (err) {
      console.error(err, 'Error in moralis handler');
      res.status(500).json({ error: 'An error occurred for fetching Zora Leaderboard' });
    }
  },




  /* 
  The Keepers - Base : // interested in mintReferal
  https://basescan.org/address/0xbd87f4da73ff92a7bea31e2de20e14f9829f42fe
  
Honey - Optimism: 
Song contract - https://optimistic.etherscan.io/address/0x9f3303e2c04e79387c3b5089b8a73e0b466e9076
  
  
Breathe  - Optimism: 
Song contract: https://optimistic.etherscan.io/address/0xfcf069b5876ab35107e44906933cf67110a60bcd
  */
};

export default moralisHandler;
