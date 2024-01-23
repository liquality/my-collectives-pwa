import axios from "axios";
import { Contract, ethers } from "ethers";
import {
    MINT_REWARDS_ABI_ERC1155

} from "../constants";

export async function getTopContributorFromEvents(challengeCreationTime: Date, challengeExpiryTime: Date, tokenContract: string, network: string) {
    //TODO: add creation time from challenge new Date("2023-12-21 09:53:42.648-03")
    const createdBlock = await fetchBlockDataFromTimeStamp(challengeCreationTime, network)
    const expiryBlock = await fetchBlockDataFromTimeStamp(challengeExpiryTime, network)
    /*  const createdBlock = await fetchBlockDataFromTimeStamp(new Date("2024-01-18 15:58:42.648-03"), network)
     const expiryBlock = await fetchBlockDataFromTimeStamp(new Date(), network)
  */

    const leaderboard = await getZoraLeaderboardEvents(tokenContract, createdBlock, expiryBlock)
    const topContributor = leaderboard[0]
    return topContributor
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
    console.log()
    const processedEntries = await processLogEntriesForZoraLeaderboard(transferEvents, tokenContract);
    return processedEntries;
}

async function processLogEntriesForZoraLeaderboard(transferEvents: any[], contractAddress: string) {
    const mintReferralCountMap: { [minter: string]: { mintCount: number; blockNumber: number } } = {};

    for (const transferEventEntry of transferEvents) {
        const minter = transferEventEntry?.args?.sender;
        const mintQuantity = transferEventEntry?.args?.quantity?.toNumber(); // Ensure mintQuantity is a number
        console.log(transferEventEntry.blockNumber, 'transfer event args MINTQUANTITY', mintQuantity, typeof mintQuantity);

        // Check if the minter is defined in the args
        if (minter) {
            if (!mintReferralCountMap[minter]) {
                mintReferralCountMap[minter] = { mintCount: mintQuantity ? mintQuantity + 1 : 1, blockNumber: transferEventEntry.blockNumber };
            } else {
                // If the minter is already in the map, increment the count by mintQuantity + 1
                mintReferralCountMap[minter].mintCount += mintQuantity ? mintQuantity + 1 : 1;
            }
        }
    }

    // Convert the map to an array of objects
    const returnObject = Object.keys(mintReferralCountMap).map((sender) => ({
        address: sender,
        blockNumber: mintReferralCountMap[sender].blockNumber,
        mintCount: mintReferralCountMap[sender].mintCount,
    }));

    console.log(returnObject, 'return object');
    return returnObject.sort((a, b) => {
        if (b.mintCount !== a.mintCount) {
            // Sort by mintCount in descending order
            return b.mintCount - a.mintCount;
        } else {
            // If mintCounts are equal, sort by blockNumber in ascending order
            return a.blockNumber - b.blockNumber;
        }
    });
}




async function fetchBlockDataFromTimeStamp(timeInDate: Date, network: string) {
    const timeInUnix = Math.floor(timeInDate.getTime() / 1000)
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