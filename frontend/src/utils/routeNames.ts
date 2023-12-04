

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
        index: "/rewards",
        mymints: "/rewards/mymints",
        summary: "/rewards/summary",
        airdrops: "/rewards/airdrops"
    },
    collectiveDetail: {
        collectiveDetail: "/collectiveDetail",
        mints: "/collectiveDetail/:groupId/mints",
        chat: "/collectiveDetail/:groupId/chat",
        info: "/collectiveDetail/:groupId/info",
    },
    invite: {
        index: "/invite"
    },

}

export const getLastIndexOfPath = (pathname: string) => {
    const groupId = pathname.substring(
        pathname.lastIndexOf("/") + 1
    );
    return groupId
}


