import { Contract, ethers, Event } from "ethers";
import {
    SONG_CONTRACT,
    ZORA_REWARDS_ABI,
    ZORA_REWARDS_CONTRACT_ADDRESS,
} from "./constants";
import { ZDK } from "@zoralabs/zdk";
import { Chain, Network } from "@zoralabs/zdk/dist/queries/queries-sdk";
import { Challenge } from "../models/challenges";
const BASE_RPC = "https://base-mainnet.g.alchemy.com/v2/";

//zora contract on OP: https://zora.co/collect/oeth:0x31f88a359a045aba182a3e1d05ceaa5a5b0f5912/0
//https://coinsbench.com/fetching-historical-events-from-a-smart-contract-f1c974ccd24d

export async function getZoraLeaderboardEvents(nftContractAddress: string): Promise<any[]> {
    const PROVIDER = new ethers.providers.JsonRpcProvider(BASE_RPC + process.env.ALCHEMY_API_KEY_ARB); //TODO: try with a base contract
    const zoraContract = new Contract(ZORA_REWARDS_CONTRACT_ADDRESS, ZORA_REWARDS_ABI, PROVIDER);
    const transferFilter = zoraContract.filters.RewardsDeposit();
    const fromBlock = 5970362
    const toBlock = 5985367
    const rewardEvent: Event[] = await zoraContract.queryFilter(transferFilter, fromBlock, toBlock);
    console.log(
        `${rewardEvent.length} events have been emitted by the contract with address ${SONG_CONTRACT.THE_KEEPERS}`
    );
    const processedEntries = await processLogEntriesForZoraLeaderboard(rewardEvent, nftContractAddress);
    return processedEntries;
}

async function processLogEntriesForZoraLeaderboard(rewardEvents: Event[], contractAddress: string): Promise<any[]> {
    const mintReferralCountMap: { [minter: string]: number } = {};

    for (const rewardEventEntry of rewardEvents) {
        const from = rewardEventEntry?.args?.from;
        const mintReferral = rewardEventEntry?.args?.mintReferral;

        if (from.toLowerCase() === contractAddress.toLowerCase() && mintReferral) {
            if (mintReferralCountMap[mintReferral]) {
                mintReferralCountMap[mintReferral]++;
            } else {
                mintReferralCountMap[mintReferral] = 1;
            }
        }
    }

    const returnObject: Array<{ addressForTheOneWhoReferred: string, numberOfReferrals: number }> = [];

    for (const minter in mintReferralCountMap) {
        returnObject.push({
            addressForTheOneWhoReferred: minter,
            numberOfReferrals: mintReferralCountMap[minter],
        });
    }

    const nftOwners = await getMintersFromZora(contractAddress);
    const finalReturnObject: Array<{ minter: string, numberOfMints: number, referrals: number, score: number }> = [];

    // Create a map of addresses from nftOwners for efficient lookup
    const nftOwnersMap: { [key: string]: { minter: string, numberOfMints: number } } = {};
    for (const owner of nftOwners) {
        nftOwnersMap[owner.minter.toLowerCase()] = owner;
    }

    for (const referral of returnObject) {
        const minter = referral.addressForTheOneWhoReferred.toLowerCase();
        const nftOwner = nftOwnersMap[minter];

        if (nftOwner) {
            finalReturnObject.push({
                minter: minter,
                numberOfMints: nftOwner.numberOfMints,
                referrals: referral.numberOfReferrals,
                score: (nftOwner.numberOfMints * 0.7) + (referral.numberOfReferrals * 0.3),
            });

            // Remove the address from nftOwnersMap
            delete nftOwnersMap[minter];
        } else {
            finalReturnObject.push({
                minter: minter,
                numberOfMints: 0,
                referrals: referral.numberOfReferrals,
                score: (0 * 0.7) + (referral.numberOfReferrals * 0.3),
            });
        }
    }

    // Append any remaining addresses from nftOwnersMap
    for (const minter in nftOwnersMap) {
        finalReturnObject.push({
            minter: minter,
            numberOfMints: nftOwnersMap[minter].numberOfMints,
            referrals: 0,
            score: (nftOwnersMap[minter].numberOfMints * 0.7) + (0 * 0.3),
        });
    }

    return finalReturnObject.sort((a, b) => b.score - a.score);
}




export async function getMintersFromZora(nftContractAddress: string) {
    const API_ENDPOINT = "https://api.zora.co/graphql";
    const zdk = new ZDK({
        endpoint: API_ENDPOINT,
        networks: [

            {
                chain: Chain.BaseMainnet,
                network: Network.Base
            }
        ],
    });

    const tokensWithData = await zdk.ownersByCount({
        where: {
            collectionAddresses: [nftContractAddress]
        },
        pagination: {
            limit: 100
        }

    });

    const pageInfo = tokensWithData.aggregateStat.ownersByCount.nodes;


    const formattedData = pageInfo.map((token) => ({
        minter: token.owner,
        numberOfMints: token.count


    }));

    return formattedData;
}

export async function getTokenMetadataFromZora(challenges: Challenge[]) {
    const API_ENDPOINT = "https://api.zora.co/graphql";
    const zdk = new ZDK({
        endpoint: API_ENDPOINT,
        networks: [
            {
                chain: Chain.Mainnet,
                network: Network.Ethereum,
            },
            {
                chain: Chain.ZoraMainnet,
                network: Network.Zora,
            },
        ],
    });

    console.log(challenges, 'all the challenges')
    const tokensWithData = await zdk.tokens({
        where: {
            tokens: challenges.map((challenge) => ({
                tokenId: challenge.tokenId || "",
                address: challenge.mintingContractAddress || "",
            })),
        },
    });

    return tokensWithData.tokens.nodes.map(({ token }) => ({
        name: token.name,
        imageUrl: token.image?.url ?? "",
        collectionAddress: token.collectionAddress,
        tokenId: token.tokenId,
    }));
}

