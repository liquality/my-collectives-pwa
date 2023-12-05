import { useState, useEffect } from "react";
import { Group } from "@/types/general-types";
import ApiService from "@/services/ApiService";
import { useAccount } from "wagmi";

interface MemberCount {
  member_count: number;
}

export function useGetNumberOfMembersInGroup(groupAddress: string) {
  const [numberOfMembersInGroup, setNumberOfMembersInGroup] =
    useState<MemberCount | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        if (groupAddress && !numberOfMembersInGroup) {
          setLoading(true);
          const _memberNumber = await ApiService.getNumberOfMembersInGroup(
            groupAddress
          );
          setNumberOfMembersInGroup(_memberNumber);
          setLoading(false);
        }
      } catch (error) {
        console.log(error, "Error fetching my groups");
      }
    };
    fetchGroups();
  }, [numberOfMembersInGroup]);
  return { numberOfMembersInGroup, loading };
}

export default useGetNumberOfMembersInGroup;
