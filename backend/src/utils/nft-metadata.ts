//This file touches everything that has to do with the metadata from Reservoir NFT API
import dotenv from "dotenv";
import axios from 'axios';
dotenv.config();

export async function fetchReservoirData(collectionAddress: string, network: string, tokenId: string) {
    let _tokenId = tokenId ? tokenId : ""
    const url = getServerUrl(_tokenId, network, collectionAddress)

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
            console.log('Data: in erc 721', data.tokens)
            return prettifiedList;
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function prettifyERC721Data(nftList: any) {
    console.log(nftList[0].token.collection, 'CÖÖÖÖÖLEETCTIÖÖÖÖN')
    const { tokenCount, name, image, description, creator, chainId } = nftList[0].token.collection
    const prettifiedList = {

        totalMints: tokenCount,
        name,
        chainId: nftList[0].token.chainId,
        kind: nftList[0].token.kind,
        imageUrl: image ? image : nftList[0].token.image,
        description: description ? description : nftList[0].token.description,
        creatorOfMint: creator
    }
    return prettifiedList
}





export async function prettifyERC1155Data(nftList: any) {
    const { name, chainId, tokenId, kind, supply, image, description, } = nftList
    console.log()
    const prettifiedList = {
        totalMints: supply,
        name,
        chainId,
        tokenId,
        kind,
        imageUrl: image,
        description,
        creatorOfMint: nftList.collection.creator
    }

    return prettifiedList
}

export function getServerUrl(tokenId: string, network: string, collectionAddress: string) {
    if (tokenId) {
        //FOR ERC-1155 s with tokenID: url = "https://api-zora.reservoir.tools/tokens/v6?tokens=0x5aa959de99e0e49b8a85e0a630a74a7b757772b7:1"
        return `https://api-${network}.reservoir.tools/tokens/v6?tokens=${collectionAddress}%3A${tokenId}`
    }
    else {
        //http GET 'https://api-zora.reservoir.tools/tokens/v6?collection=0x09dd68c87020055a19733a6ccd7bfc7e7dfb3483' \
        return `https://api-${network}.reservoir.tools/tokens/v6?collection=${collectionAddress}`
    }
}




