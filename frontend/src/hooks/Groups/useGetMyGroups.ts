import { useState, useEffect } from "react";
import { Group } from "@/types/general-types";
import ApiService from "@/services/ApiService";
import { useAccount } from "wagmi";
import { useSignInWallet } from "../useSignInWallet";

export function useGetMyGroups() {
    const [myGroups, setMyGroups] = useState<Group[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { address, isConnecting } = useAccount();
    const reload = () => {
        setMyGroups(null);
    }
    const { user } = useSignInWallet()

    const fetchUserGroups = async () => {
        try {
            if (address && !myGroups && user?.id) {
                const _myGroups: Group[] = await ApiService.readGroupByMemberAddress(address)
                setMyGroups(_myGroups)
                console.log(_myGroups, 'MY GROUPS?')
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
    }, [address, myGroups, user?.id]);


    return { myGroups, loading, reload, fetchUserGroups, setMyGroups };

}

export default useGetMyGroups;