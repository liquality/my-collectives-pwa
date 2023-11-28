

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
        collectiveDetail: "/collectiveDetail/",
        mints: "/collectiveDetail/mints/:groupId",
        chat: "/collectiveDetail/chat/:groupId",
        info: "/collectiveDetail/info/:groupId",
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


