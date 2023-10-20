

import { EvmChain } from "@moralisweb3/common-evm-utils";
import { Request, Response } from "express";
import Moralis from "moralis";
import dotenv from "dotenv"
import { poolsDummyArray } from "../dummydata";
dotenv.config()

const WAV_NFT_ADDRESS = "0x3611bB3DA6Fb531917ad3683FFDEa427dA5bA791"
const CHAIN_ID = 80001

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


    getOwners: async (req: Request, res: Response) => {
        try {
            const chain = EvmChain.ETHEREUM;
            const metadataPromises = poolsDummyArray.map(async (pool) => {
                const response = await Moralis.EvmApi.nft.getNFTTokenIdOwners({
                    "chain": "0x1",
                    "format": "decimal",
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
    }

};

export default moralisHandler;
