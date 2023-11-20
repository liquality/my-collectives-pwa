import { Message, Group, GroupCreation } from "@/types/chat";
//@ts-ignore
import NetworkService from "./NetworkService";
import { ChallengeCreation } from "@/types/challenges";

const ApiService = {
  createGroup: async function (groupObject: GroupCreation) {
    console.log(groupObject, 'groupObkect?')
    return NetworkService.postResourceWithAuth("/v1/groups/", groupObject);
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
    const accessToken = localStorage.getItem("groupMints.accessToken");
    return NetworkService.getResourceWithAuth(
      `/v1/groups/address/${memberAddress}`,
      accessToken
    );
  },

  readPools: async function () {
    return NetworkService.getResourceWithAuth("/v1/pools");
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
    const accessToken = localStorage.getItem("groupMints.accessToken");
    return NetworkService.postResourceWithAuth(
      "/v1/chat/message",
      messageObject,
      accessToken
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
};

export default ApiService;
