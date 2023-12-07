//This file touches everything that has to do with the metadata from Reservoir NFT API

import dotenv from "dotenv";

dotenv.config();
import axios from 'axios';

export async function fetchReservoirData(collectionAddress: string, network: string, tokenId: string) {

    let _tokenId = tokenId ? tokenId : ""
    let url
    if (tokenId) {
        url = `https://api-${network}.reservoir.tools/tokens/v6?tokens=${collectionAddress}%3A${_tokenId}`
        //FOR ERC-1155 s with tokenID: url = "https://api-zora.reservoir.tools/tokens/v6?tokens=0x5aa959de99e0e49b8a85e0a630a74a7b757772b7:1"

    }
    else {
        url = `https://api-${network}.reservoir.tools/tokens/v6?collection=${collectionAddress}`
        //http GET 'https://api-zora.reservoir.tools/tokens/v6?collection=0x09dd68c87020055a19733a6ccd7bfc7e7dfb3483' \

    }


    try {
        const response = await axios.get(url, {
            //params: { collection: collectionAddress },
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.RESERVOIR_API_KEY,
            },
        });

        const data = response.data;
        if (tokenId) {
            const prettifiedList = await prettifyERC1155Data(data.tokens[0].token)
            console.log('Data: in erc 1155', data.tokens[0].token);
            return prettifiedList;

        }
        else {
            const prettifiedList = await prettifyERC721Data(data.tokens)
            console.log('Data: in erc 721', prettifiedList)
            return prettifiedList;
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function prettifyERC721Data(nftList: any) {
    const { tokenCount, name, image, description, creator, chainId } = nftList[0].token.collection
    const prettifiedList = {
        totalMints: tokenCount,
        name,
        chainId: nftList[0].token.chainId,
        kind: nftList[0].token.kind,
        image,
        description,
        creatorOfMint: creator
    }
    return prettifiedList
}



export async function prettifyERC1155Data(nftList: any) {
    const { name, chainId, tokenId, kind, supply, image, description, } = nftList
    const prettifiedList = {
        totalMints: supply,
        name,
        chainId,
        tokenId,
        kind,
        image,
        description,
        creatorOfMint: nftList.collection.creator
    }

    return prettifiedList
}




