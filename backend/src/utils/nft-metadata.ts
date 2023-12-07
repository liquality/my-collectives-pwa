//This file touches everything that has to do with the metadata from Reservoir NFT API

import dotenv from "dotenv";

dotenv.config();
import axios from 'axios';

export async function fetchReservoirData(collectionAddress: string, network: string, tokenId: string) {

    let _tokenId = tokenId ? tokenId : ""
    //FOR ERC-1155 s with tokenID: url = "https://api-zora.reservoir.tools/tokens/v6?tokens=0x5aa959de99e0e49b8a85e0a630a74a7b757772b7:1"

    console.log(_tokenId, 'TOkenID')
    let ourUrl = `https://api-${network}.reservoir.tools/tokens/v6?tokens=${collectionAddress}%3A${_tokenId}`
    console.log(ourUrl, 'OUR URL')
    try {
        const response = await axios.get(ourUrl, {
            //params: { collection: collectionAddress },
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.RESERVOIR_API_KEY,
            },
        });

        const data = response.data;
        if (tokenId) {

            console.log('Data: in erc 1155', data.tokens[0].token);
            return data.tokens[0].token;

        }
        else {
            console.log('Data in erc721:', data);
            return data.tokens;
        }

    } catch (error) {
        console.error('Error:', error);
    }
}




