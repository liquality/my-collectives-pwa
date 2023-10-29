

import { EvmChain } from "@moralisweb3/common-evm-utils";
import { Request, Response } from "express";
import Moralis from "moralis";
import dotenv from "dotenv"
import { poolsDummyArray } from "../dummydata";
import axios from "axios";
import helper from "../helper";

dotenv.config()

const WAV_NFT_ADDRESS = "0x3611bB3DA6Fb531917ad3683FFDEa427dA5bA791"
const CHAIN_ID = 80001



const SOUND_API_URL = 'https://api.sound.xyz/graphql';
const SOUND_API_KEY = process.env.SOUND_API_KEY
const soundHeaders = {
    'Content-Type': 'application/json',
    'X-Sound-Client-Key': SOUND_API_KEY,
};

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
        //TK contract: 0x0000000000cf4558c36229ac0026ee16d3ae35cd

        //1) First get the releaseId from collectionId
        try {
            const query = `
            query {
              releaseAffiliateTotalPurchases {
                affiliate {
                  # Include fields for User type if needed
                }
                earningsETH
                earningsWei
                id
                purchasesQuantity
                referredCollectors(input: {
                  pagination: { after: null, first: 20, sort: { blockNumber: ASC } }
                }) {
                  edges {
                    node {
                      # Include fields for ReferredUser (from ReleaseReferredCollectorConnection) if needed
                    }
                    cursor
                  }
                  pageInfo {
                    endCursor
                    hasNextPage
                  }
                }
                release {
                  # Include fields for Release type if needed
                }
              }
            }
          `;

            const requestData = {
                query,
            };

            axios
                .post(SOUND_API_URL, requestData, { headers: soundHeaders })
                .then((response) => {
                    console.log('Response Data:', response.data.data);
                    res.status(200).json(response.data.data); // Send the data field of the response
                })
                .catch((error) => {
                    console.error('Error:', error);
                    res.status(500).json({ error: 'An error occurred for Sound Leaderboard' });
                });


        } catch (err) {
            console.error(err, 'Error in sound leaderboard');
            res.status(500).json({ error: 'An error occurred for Sound Leaderboard' });
        }
    },


    getLeaderboardForZora: async (req: Request, res: Response) => {
        try {
            const rewards = await helper.getPoolMintEvents("", "")
            res.status(200).json(rewards);
        } catch (err) {
            console.error(err, 'Error in moralis handler');
            res.status(500).send({ error: 'An error occurred' });
        }
    },





};

export default moralisHandler;
