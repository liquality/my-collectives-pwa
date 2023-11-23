export const routes = {
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
        collectiveDetail: "/collectiveDetail/",
        mints: "/collectiveDetail/mints/",
        chat: "/collectiveDetail/chat/",
        info: "/collectiveDetail/info/",


    },
    invite: {
        index: "/invite"
    }
}