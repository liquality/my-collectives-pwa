import { Message, Group, GroupCreation } from "@/types/chat";
//@ts-ignore
import NetworkService from "./NetworkService";

const ApiService = {
  createGroup: async function (groupObject: GroupCreation) {
    return NetworkService.postResourceWithAuth("/v1/group/", groupObject);
  },

  //Includes groupId and public address
  createMember: async function (member: any) {
    return NetworkService.postResourceWithAuth("/v1/member/", member);
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

  getNumberOfMembersInGroup: async function (groupAddress: string) {
    return NetworkService.getResourceWithAuth("/v1/members/" + groupAddress);
  },

  createMessage: async function (messageObject: any) {
    const accessToken = localStorage.getItem("groupMints.accessToken");
    return NetworkService.postResourceWithAuth("/v1/chat/message", messageObject, accessToken);
  },

  createInvite: async function (groupId: Partial<Group>) {
    return NetworkService.postResourceWithAuth("/v1/invites/", {groupId});
  },

  readInvite: async function (id: string) {
    return NetworkService.getResourceWithAuth("/v1/invites/" + id);
  },

  readMessagesByGroupId: async function (groupId: string) {
    return NetworkService.getResourceWithAuth("/v1/chat/" + groupId);
  },

  getUser: async function (address: string) {
    return NetworkService.getResourceWithAuth(`/v1/auth/user/${address}`);
  },

  loginUser: async function (publicAddress: string, signature: string) {
    return NetworkService.postResourceWithAuth("/v1/auth/login", {
      publicAddress,
      signature,
    });
  },
  createUser: async function (publicAddress: string) {
    return NetworkService.postResourceWithAuth("/v1/auth/user", {
      publicAddress,
    });
  },
};

export default ApiService;
