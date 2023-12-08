import axios from "axios";
import { configHeaders } from "./token-metadata";


//TODO: you should also call a endpoint to get YOUR address here
export async function fetchLeaderboardMintActivityData(collectionAddress: string, network: string, tokenId: string) {
    let _tokenId = tokenId ? tokenId : ""
    const url = getServerUrlForLeaderboard(_tokenId, network, collectionAddress)
    //'https://api-zora.reservoir.tools/owners/v2?token=0x5aa959de99e0e49b8a85e0a630a74a7b757772b7%3A1' \
    //http GET 'https://api-zora.reservoir.tools/owners/v2?collection=0x5aa959de99e0e49b8a85e0a630a74a7b757772b7&limit=5' \

    try {
        const response = await axios.get(url, configHeaders);
        const data = response.data;

        const topMinterArray = await getTopMinters(data.owners)
        if (tokenId) {

            return topMinterArray;
        }
        else {

            return topMinterArray;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}



export function getServerUrlForLeaderboard(tokenId: string, network: string, collectionAddress: string) {
    if (tokenId) {
        return `https://api-${network}.reservoir.tools/owners/v2?token=${collectionAddress}%3A${tokenId}&limit=500`
    }
    else {
        return `https://api-${network}.reservoir.tools/owners/v2?collection=${collectionAddress}&limit=500`
    }
}


export async function getTopMinters(owners: any[]) {

    const sortedOwners = owners.sort((a, b) => parseInt(b.ownership.tokenCount) - parseInt(a.ownership.tokenCount));
    const topMinters = sortedOwners.slice(0, 10);

    return topMinters.map((owner) => ({
        totalCount: owner.ownership.tokenCount,
        amount: {
            native: owner.ownership.floorAskPrice?.amount?.native ?? null,
            totalNative: (owner.ownership.floorAskPrice?.amount?.native * owner.ownership?.tokenCount).toFixed(5) === "NaN" ? null : (owner.ownership.floorAskPrice?.amount?.native * owner.ownership?.tokenCount).toFixed(5),
            raw: owner.ownership?.floorAskPrice?.amount?.raw ?? null,
        },
        address: owner.address,
    }));
};

