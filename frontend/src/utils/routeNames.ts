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
    //NOTE: groupId should be attached towards the end of all of these routes
    collectiveDetail: {
        collectiveDetail: (groupId: string) => { return `/collectiveDetail/${groupId}` },
        mints: (groupId: string) => { return `/collectiveDetail/mints/${groupId}` },
        chat: (groupId: string) => { return `/collectiveDetail/chat/${groupId}` },
        info: (groupId: string) => { return `/collectiveDetail/info/${groupId}` }
    },
    invite: {
        index: "/invite"
    }
}


