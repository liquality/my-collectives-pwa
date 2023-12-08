import axios from "axios";
import { configHeaders } from "./token-metadata";

//TODO if floorprice doesnt exist, we have to fetch it from a seperate apiEndpoint
export async function getFloorPrice(tokenId: string, network: string, collectionAddress: string) {
    let _tokenId = tokenId ? tokenId : ""
    const url = ""
    try {
        const response = await axios.get(url, configHeaders);
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

