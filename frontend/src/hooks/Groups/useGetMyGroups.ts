import { useState, useEffect } from "react";
import { checkAuth } from "@/utils";
import { Group } from "@/types/chat";
import ApiService from "@/services/ApiService";
import { useAccount } from "wagmi";

export function useGetMyGroups() {
    const [myGroups, setMyGroups] = useState<Group[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { address } = useAccount();
    const reload = () => {
        setMyGroups(null);
    }

    useEffect(() => {
        const fetchGroups = async () => {

            try {
                if (address && !myGroups) {
                    setLoading(true)
                    const _myGroups: Group[] = await ApiService.readGroupByMemberAddress(address)
                    setMyGroups(_myGroups)
                    setLoading(false)

                }
            } catch (error) {
                console.log(error, 'Error fetching my groups')
            }

        };
        fetchGroups();
    }, [myGroups]);
    return { myGroups, loading, reload };
}

export default useGetMyGroups;