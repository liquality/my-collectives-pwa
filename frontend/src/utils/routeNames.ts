

export const pathConstants = {
    mintPage: {
        mint: "/mint",
        myCollectives: "/mint/collectiveContent",
        createCollective: "/mint/createCollective",
        noCollectives: "/mint/noCollectives",
        collectiveInvites: "/mint/collectiveInvites",
        mymints: "/mint/mymints"

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
        airdrops: "/rewards/airdrops",
        manage: "/manage/:groupId"
    },
    collective: {
        collective: "/mint/collective",
        mints: "/mint/collective/:groupId/mints",
        chat: "/mint/collective/:groupId/chat",
        info: "/mint/collective/:groupId/info",
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


