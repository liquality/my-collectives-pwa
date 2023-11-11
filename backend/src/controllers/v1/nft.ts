import { RequestHandler } from "express";
import { NFTService } from "../../services/nft";
import { getZoraLeaderboardEvents, sendGraphQLQuery } from "../../utils";
import { ethers } from "ethers";

export class NFTController {
  public getTokenMetadata: RequestHandler = async (req, res) => {
    try {
      const meta = await NFTService.getTokenMetadata();

      res.status(200).send(meta);
    } catch (err) {
      console.error(err, "Error in moralis handler");
      res.status(500).send({ error: "An error occurred" });
    }
  };

  public getLeaderboardForMoralis: RequestHandler = async (req, res) => {
    try {
      const { contractAddress, tokenId } = req.params;
      const leaderboard = await NFTService.getLeaderboard(
        contractAddress,
        tokenId
      );

      res.status(200).send(leaderboard);
    } catch (err) {
      console.error(err, "Error in moralis handler");
      res.status(500).send({ error: "An error occurred" });
    }
  };

  public getLeaderboardForSound: RequestHandler = async (req, res) => {
    const contractAddress = req.params.contractAddress
    try {
      const getReleaseIdQuery = `query ApiExplorer {
           releaseFromContract(contractAddress: "${contractAddress}") {
             id
           }
         }`;

      const releaseId = await sendGraphQLQuery(getReleaseIdQuery)
      const { id } = releaseId?.data?.releaseFromContract;

      const getMinterCountQuery = `query {
        release(id: "${id}") {
          id
          affiliates(pagination: { first: 10, after: "MjB8MGZlYzkwMGUtZWE4NS00MzEzLWEwNTYtMjJjZTlmYmQ3ZGRk" }) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              endCursor
              startCursor
            }
            edges {
              node {
                id
                affiliateAddress
                affiliateUser {
                  id
                  publicAddress
                }
                grossSalesDriven
                grossSalesDrivenUsd
                affiliateFeeEarned
                nftQuantityDriven
              }
              cursor
            }
          }
          collectors {
            pageInfo {
              hasNextPage
              startCursor
              hasPreviousPage
            }
            edges {
              node {
                volumeSpent
                nftsCount
                user {
                  publicAddress
                }
                affiliateUser {
                  id
                  publicAddress
                }
              }
            }
          }
        }
      }
      `;

      const minterCount = await sendGraphQLQuery(getMinterCountQuery);
      const { collectors, affiliates } = minterCount?.data?.release;
      const collectorsArray = collectors.edges.map((edge: any) => edge.node);
      const affiliatesArray = affiliates.edges.map((edge: any) => edge.node);

      const renamedCollectorsArray = collectorsArray.map((item: any) => {
        const volumeInEth = Number(ethers.utils.formatEther(item.volumeSpent).slice(0, 6));
        // Find corresponding affiliate entry, if it exists
        const affiliateEntry = affiliatesArray.find((affiliate: any) => affiliate.affiliateUser.publicAddress === item.user.publicAddress);

        // Calculate referrals based on whether affiliate entry is found
        const referrals = affiliateEntry ? affiliateEntry.nftQuantityDriven : 0;
        const score = (volumeInEth * 0.7) + (referrals * 0.3);
        return {
          'minter': item.user.publicAddress,
          'numberOfMints': item.nftsCount,
          'referrals': referrals,
          'volume': volumeInEth,
          'score': (score * 100).toString().slice(0, 4)
        };
      });

      // Add new entries for affiliates not found in collectorsArray
      affiliatesArray.forEach((affiliate: any) => {
        const isFound = renamedCollectorsArray.some((collector: any) => collector.minter === affiliate.affiliateUser.publicAddress);
        if (!isFound) {
          const score = (affiliate.nftQuantityDriven * 0.3).toFixed(3);


          renamedCollectorsArray.push({
            'minter': affiliate.affiliateUser.publicAddress,
            'numberOfMints': 0,
            'referrals': affiliate.nftQuantityDriven,
            'volume': score,
            'score': (Number(score) * 100).toString().slice(0, 4)
          });
        }
      });



      res.status(200).send(renamedCollectorsArray.sort((a: any, b: any) => b.score - a.score));
    } catch (err) {
      console.error(err, 'Error in sound leaderboard');
      res.status(500).json({ error: 'An error occurred for Sound Leaderboard' });
    }

  };


  public getLeaderboardForZora: RequestHandler = async (req, res) => {
    const contractAddress = req.params.contractAddress

    try {
      const rewards = await getZoraLeaderboardEvents(contractAddress)
      res.status(200).json(rewards);
    } catch (err) {
      console.error(err, 'Error in moralis handler');
      res.status(500).json({ error: 'An error occurred for fetching Zora Leaderboard' });
    }
  };
}
