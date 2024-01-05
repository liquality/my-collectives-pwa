import axios from "axios";
import { Contract, ethers } from "ethers";
import {
    MINT_REWARDS_ABI_ERC1155

} from "../constants";

export async function getTopContributorFromEvents(challengeCreationTime: Date, challengeExpiryTime: Date, tokenContract: string, network: string) {

    //TODO: add creation time from challenge
    const createdBlock = await fetchBlockDataFromTimeStamp(new Date("2023-12-21 09:53:42.648-03"), network)
    const expiryBlock = await fetchBlockDataFromTimeStamp(challengeExpiryTime, network)

    const leaderboard = await getZoraLeaderboardEvents(tokenContract, createdBlock, expiryBlock)



}

export async function getZoraLeaderboardEvents(tokenContract: string, createdBlock: string, expiryBlock: string) {
    //TODO based on the network, create a function that returns rpc
    const GOERLI_RPC = "https://eth-goerli.g.alchemy.com/v2/";
    const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC + process.env.ALCHEMY_API_KEY_ARB); //TODO: try with a base contract
    const zoraContract = new Contract(tokenContract, MINT_REWARDS_ABI_ERC1155, provider);
    const transferFilter = zoraContract.filters.Purchased();
    const transferEvents = await zoraContract.queryFilter(transferFilter, createdBlock, expiryBlock);
    console.log(
        `${transferEvents.length} events have been emitted by the contract with address ${tokenContract}`
    );
    const processedEntries = await processLogEntriesForZoraLeaderboard(transferEvents, tokenContract);
    console.log(processedEntries, 'PROCCESSED ENTRIES?')
    //return processedEntries;
}

async function processLogEntriesForZoraLeaderboard(transferEvents: any[], contractAddress: string) {
    const mintReferralCountMap: { [minter: string]: number } = {};

    for (const transferEventEntry of transferEvents) {
        const minter = transferEventEntry?.args?.sender;
        const mintQuantity = transferEventEntry?.args?.quantity.toNumber();
        console.log(transferEventEntry?.args, 'transfer event args MINTQUANTITY', mintQuantity, typeof mintQuantity)

        // Check if the minter is defined in the args
        if (minter) {
            // If the minter is not in the map, initialize the count to 1 or mintQuantity + 1
            if (!mintReferralCountMap[minter]) {
                mintReferralCountMap[minter] = mintQuantity ? mintQuantity + 1 : 1;
            } else {
                // If the minter is already in the map, increment the count by mintQuantity + 1
                mintReferralCountMap[minter] += mintQuantity ? mintQuantity + 1 : 1;
            }
        }
    }

    // Convert the map to an array of objects
    const returnObject = Object.keys(mintReferralCountMap).map((sender) => ({
        address: sender,
        mintCount: mintReferralCountMap[sender],
    }));

    return returnObject.sort((a, b) => b.mintCount - a.mintCount);

}



async function fetchBlockDataFromTimeStamp(timeInDate: Date, network: string) {
    console.log(network, 'wats network?')
    const timeInUnix = Math.floor(timeInDate.getTime() / 1000)
    console.log(timeInUnix, 'time in unix')

    const apiUrl = `https://coins.llama.fi/block/${network}/${timeInUnix}`;
    try {
        const response = await axios.get(apiUrl);
        const blockData = response.data;
        console.log('Block Data:', blockData);

        return blockData.height;
    } catch (error) {
        console.error('Error fetching block data:', error);
        throw error;
    }
}