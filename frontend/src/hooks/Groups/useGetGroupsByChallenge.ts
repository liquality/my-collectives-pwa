import { useState, useEffect } from "react";
import { Group } from "@/types/general-types";
import ApiService from "@/services/ApiService";

export function useGetGroupsByChallenge(challangeId: string) {
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        if (!groups && challangeId) {
          setLoading(true);
          const _groups: Group[] = await ApiService.getGroupsByChallenge(
            challangeId
          );

          setGroups(_groups);
          setLoading(false);
        }
      } catch (error) {
        console.log(error, "Error fetching groups");
        setLoading(false);
      }
    };
    fetchGroup();
  }, [groups, challangeId]);
  return { groups, loading };
}

export default useGetGroupsByChallenge;
