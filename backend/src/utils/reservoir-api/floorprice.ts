import axios from "axios";
import { configHeaders } from "./token-metadata";

//If floorprice doesnt exist, we have to fetch it from a seperate apiEndpoint
export async function getFloorPrice(tokenId: string, network: string, collectionAddress: string) {
    let _tokenId = tokenId ? tokenId : ""
    const url = getServerUrlForPriceFloor(_tokenId, network, collectionAddress)

    try {
        const response = await axios.get(url, configHeaders);
        const data = response.data;
        if (tokenId) {
            return data.sales[0].price.amount.decimal;
        }
        else {
            return data.sales[0].price.amount.decimal;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}



function getServerUrlForPriceFloor(tokenId: string, network: string, collectionAddress: string) {
    if (tokenId) {
        return `https://api-${network}.reservoir.tools/sales/v6?tokens=${collectionAddress}%3A${tokenId}&includeTokenMetadata=true&sortBy=time`
    }
    else {
        return `https://api-${network}.reservoir.tools/sales/v6?contract=${collectionAddress}&sortBy=time`

    }
}

