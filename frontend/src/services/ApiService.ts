import { Message, Group, GroupCreation } from "@/types/general-types";
//@ts-ignore
import NetworkService from "./NetworkService";
import { Challenge, ChallengeCreation } from "@/types/challenges";
import { Auth } from "@/utils";
const ApiService = {
  createGroup: async function (groupObject: any) {
    return NetworkService.postResourceWithAuth("/v1/groups/", groupObject,);
  },

  updateGroup: async function (groupId: string, groupObject: any) {
    console.log('inside network update', groupId, groupObject)
    return NetworkService.putResourceWithAuth("/v1/groups/" + groupId, groupObject,);
  },

  //Includes groupId and public address
  createMember: async function (id: string, member: any) {
    return NetworkService.postResourceWithAuth(
      `/v1/groups/${id}/members`,
      member
    );
  },

  readGroup: async function (groupId: string) {
    return NetworkService.getResourceWithAuth("/v1/groups/" + groupId);
  },


  readGroupByMemberAddress: async function (memberAddress: string) {
    return NetworkService.getResourceWithAuth(
      `/v1/groups/address/${memberAddress}`,
      Auth.accessToken
    );
  },

  readPools: async function () {
    return NetworkService.getResourceWithAuth("/v1/pools");
  },

  readPoolsByGroupId: async function (groupId: string) {
    return NetworkService.getResourceWithAuth("/v1/pools/group/" + groupId);
  },

  readChallenges: async function () {
    return NetworkService.getResourceWithAuth("/v1/challenges");
  },


  createChallenges: async function (challengeObject: ChallengeCreation) {
    return NetworkService.postResourceWithAuth("/v1/challenges", challengeObject);
  },

  getNumberOfMembersInGroup: async function (groupAddress: string) {
    return NetworkService.getResourceWithAuth("/v1/members/" + groupAddress);
  },

  createMessage: async function (messageObject: any) {
    return NetworkService.postResourceWithAuth(
      "/v1/chat/message",
      messageObject,
      Auth.accessToken
    );
  },

  createInvite: async function (groupId: Partial<Group>) {
    return NetworkService.postResourceWithAuth("/v1/invites/", { groupId });
  },

  readInvite: async function (id: string) {
    return NetworkService.getResourceWithAuth("/v1/invites/" + id);
  },

  readMessagesByGroupId: async function (groupId: string) {
    return NetworkService.getResourceWithAuth("/v1/chat/" + groupId);
  },

  getUser: async function (address: string) {
    try {
      const result = await NetworkService.getResourceWithAuth(
        `/v1/auth/user/${address}`
      );
      return result;
    } catch (error) {
      console.error(error, "getUser error");
      return null;
    }
  },

  loginUser: async function (publicAddress: string, signature: string) {
    return NetworkService.postResourceWithAuth("/v1/auth/login", {
      publicAddress,
      signature,
    });
  },
  createUser: async function ({ publicAddress }: { publicAddress: string }) {
    return NetworkService.postResourceWithAuth("/v1/auth/user", {
      publicAddress,
    });
  },

  getLeaderboardMintActivity: async function (collectionAddress: string, network: string, tokenId: string) {
    return NetworkService.getResourceWithAuth(`/v1/nft/mintactivity/${collectionAddress}/${network}/${tokenId}`);
  },





};

export default ApiService;
