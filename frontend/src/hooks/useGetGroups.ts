import { useState, useEffect } from "react";
import { checkAuth } from "@/utils";
import { Group } from "@/types/chat";
import UserService from "@/services/UserService";
//import { getMyGroups } from "safeWrapperSDK";


export function useGetGroups() {
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        const fetchGroups = async (publicAddress: string) => {
            //await getMyGroups(publicAddress)
            //TODO HERE: fetch all members of multisig and filter out by publicconst isAuthenticated = await UserService.readGroup();

            //setGroups(isAuthenticated);
        };

        fetchGroups();
    }, [groups]);

    return groups;
}

export default useGetGroups;