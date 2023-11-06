import { poolsDummyData } from "@/poolsdummydata";
import { Message, Group, GroupCreation } from "@/types/chat";
//@ts-ignore
import NetworkService from "./NetworkService";




const MoralisService = {
    getLeaderboard: async function (tokenId: string, contractAddress: string) {
        return NetworkService.getResourceWithAuth("/v1/nft/leaderboard/moralis/" + tokenId + "/" + contractAddress);
    },

    getLeaderboardOld: async function () {

        /*       const nftObject = await this.fetchNFTOwners();
              const filteredArray = nftObject.result.filter((item) => item.token_id.startsWith(artistNumberId / 1000));
              const levelCounts = {};
      
              filteredArray.forEach((item, index) => {
                  const tokenId = parseInt(item.token_id);
                  const owner = item.owner_of;
      
                  if (!levelCounts[`level${tokenId}`]) {
                      levelCounts[`level${tokenId}`] = new Set();
                  }
      
                  levelCounts[`level${tokenId}`].add(owner);
              });
      
              const result = {};
              Object.keys(levelCounts).forEach((level) => {
                  result[level] = levelCounts[level].size;
              });
      
              return result; */
    },

    fetchTokenMetaData: async function () {
        return poolsDummyData
    },





};

export default MoralisService;
