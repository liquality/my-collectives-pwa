import { Message, Group, GroupCreation } from "@/types/chat";
//@ts-ignore
import NetworkService from "./NetworkService";


const WAV_NFT_ADDRESS = "0x3611bB3DA6Fb531917ad3683FFDEa427dA5bA791"
const CHAIN_ID = 80001

const MoralisService = {
    fetchNFTOwners: async function () {

        const hexValue = CHAIN_ID.toString(16);
        const hexValueWithPrefix = "0x" + hexValue;

        if (process.env.REACT_APP_MORALIS_API_KEY) {
            const url =
                `https://deep-index.moralis.io/api/v2/nft/${WAV_NFT_ADDRESS}/owners?chain=${hexValueWithPrefix}&disable_total=false`;

            const headers = {
                "x-api-key": process.env.REACT_APP_MORALIS_API_KEY,
            };

            try {
                const response = await fetch(url, { headers });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error:", error);
                throw error;
            }
        } else { console.log("Error, must set Moralis API key") }
    },

    getLeaderboard: async function () {

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





};

export default MoralisService;
