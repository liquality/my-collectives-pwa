import { useState, useEffect } from "react";
import { Group } from "@/types/general-types";
import ApiService from "@/services/ApiService";

export function useGetGroupsByChallenge(challengeId: string) {
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        if (!groups && challengeId) {
          setLoading(true);
          const _groups: Group[] = await ApiService.getGroupsByChallenge(
            challengeId
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
  }, [groups, challengeId]);
  return { groups, loading };
}

export default useGetGroupsByChallenge;
