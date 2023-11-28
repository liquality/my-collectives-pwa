import { Message, Group, GroupCreation } from "@/types/chat";
//@ts-ignore
import NetworkService from "./NetworkService";
const InvitesService = {
  createInvite: async function (groupId: Partial<Group>) {
    return NetworkService.postResourceWithAuth("/v1/invites/", { groupId });
  },
  getInvite: async function (id: string) {
    return NetworkService.getResourceWithAuth("/v1/invites/" + id);
  },
  getInviteByCode: async function (code: string) {
    return NetworkService.getResourceWithAuth(`/v1/invites/code/${code}`);
  },
  claim: async function (id: string, publicAddress: string) {
    return NetworkService.postResourceWithAuth(`/v1/invites/${id}`, {
      publicAddress
    });
  },
};

export default InvitesService;
