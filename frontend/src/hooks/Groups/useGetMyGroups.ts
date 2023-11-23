import { useState, useEffect } from "react";
import { Group } from "@/types/chat";
import ApiService from "@/services/ApiService";
import { useAccount } from "wagmi";
import { useSignInWallet } from "../useSignInWallet";

export function useGetMyGroups() {
    const [myGroups, setMyGroups] = useState<Group[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { address, isConnecting } = useAccount();
    const reload = () => {
        setMyGroups(null);
    }
    const { user } = useSignInWallet()

    const fetchUserGroups = async () => {
        setLoading(true)
        try {
            if (address && !myGroups && !isConnecting && user?.id) {
                const _myGroups: Group[] = await ApiService.readGroupByMemberAddress(address)
                setMyGroups(_myGroups)
            } else if (!address) {
                setMyGroups(null)

            }
        } catch (error) {
            console.log(error, 'Error fetching my groups')
        }
        setLoading(false)
    };


    useEffect(() => {
        // Fetch groups on component mount and whenever the address changes
        fetchUserGroups();
    }, [address, myGroups]);


    return { myGroups, loading, reload, fetchUserGroups, setMyGroups };

}

export default useGetMyGroups;