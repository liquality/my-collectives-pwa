import { RequestHandler } from "express";
import { NFTService } from "../../services/nft";
import { getZoraLeaderboardEvents, sendGraphQLQuery } from "../../utils";

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

      const getMinterCountQuery = `query ApiExplorer {
        release(id: "${id}") {
        collectors {
          pageInfo {
            hasNextPage
            startCursor
            hasPreviousPage
          }
          edges {
            node {
              nftsCount
             user{
              publicAddress
            }
            }
          }
        }
      }
    }`;

      const minterCount = await sendGraphQLQuery(getMinterCountQuery)
      const { collectors } = minterCount?.data?.release;
      const nodesArray = collectors.edges.map((edge: any) => edge.node);
      const renamedArray = nodesArray.map((item: any) => ({
        'minter': item.user.publicAddress,
        'numberOfMints': item.nftsCount,
        'topContributor': 'Coming soon'
      }));

      res.status(200).send(renamedArray);
    } catch (err) {
      console.error(err, 'Error in sound leaderboard');
      res.status(500).json({ error: 'An error occurred for Sound Leaderboard' });
    }
  };


  public getLeaderboardForZora: RequestHandler =async (req, res) => {
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
