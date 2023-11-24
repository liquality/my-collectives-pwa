import { Route } from "react-router"
import CollectiveDetail from "@/pages/Mint/CollectiveDetail/CollectiveDetail"
import CollectiveMint from "@/pages/Mint/CollectiveDetail/CollectiveDetail"
import CollectiveChat from "@/pages/Mint/CollectiveDetail/CollectiveDetail"

export const pathConstants = {
    mintPage: {
        mint: "/mint",
        myCollectives: "/mint/collectiveContent",
        manageCollective: "/mint/manageCollective",
        createCollective: "/mint/createCollective",
        noCollectives: "/mint/noCollectives",
        collectiveInvites: "/mint/collectiveInvites"
    },
    discover: {
        discover: "/discover",
        new: "/discover/new",
        about: "/discover/about"
    },
    rewards: {
        index: "/rewards"
    },
    collectiveDetail: {
        collectiveDetail: (groupId: string) => `/collectiveDetail/${groupId}`,
        mints: (groupId: string) => `/collectiveDetail/mints/${groupId}`,
        chat: (groupId: string) => `/collectiveDetail/chat/${groupId}`,
        info: (groupId: string) => `/collectiveDetail/info/${groupId}`,
    },
    invite: {
        index: "/invite"
    }
}

export const getLastIndexOfPath = (pathname: string) => {
    const groupId = pathname.substring(
        pathname.lastIndexOf("/") + 1
    );
    return groupId
}


