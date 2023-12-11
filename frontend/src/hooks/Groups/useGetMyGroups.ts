import { useState, useEffect } from "react";
import { Group } from "@/types/general-types";
import ApiService from "@/services/ApiService";
import { useAccount } from "wagmi";
import { Auth } from "@/utils";
import useUser from "./useUser";

export function useGetMyGroups() {
    const [myGroups, setMyGroups] = useState<Group[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useUser()
    const { address, isConnecting } = useAccount();

    const reload = () => {
        console.log('Inside reload', myGroups, user?.id, Auth.accessToken, address,)
        setMyGroups(null);
    }
    console.log(user, 'wats iser?')


    const fetchUserGroups = async () => {
        console.log('Fetch my groups userId & accesstoken:', user?.id, Auth.accessToken)
        try {
            if (address && !myGroups && user?.id) {
                const _myGroups: Group[] = await ApiService.readGroupByMemberAddress(address)
                setMyGroups(_myGroups)
                setLoading(false)

            } else if (!address) {
                setMyGroups(null)
                setLoading(false)


            }
        } catch (error) {
            console.log(error, 'Error fetching my groups')
        }
    };


    useEffect(() => {
        // Fetch groups on component mount and whenever the address changes
        fetchUserGroups();
    }, [address, myGroups, user?.id, user]);


    return { myGroups, loading, reload, fetchUserGroups, setMyGroups };

}

export default useGetMyGroups;