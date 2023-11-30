import { useState, useEffect } from "react";
import { Group } from "@/types/chat";
import ApiService from "@/services/ApiService";

export function useGetGroupById(groupId: string) {
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        if ((!group || (group?.id !== groupId)) && groupId) {
          setLoading(true);
          const _group: Group = await ApiService.readGroup(groupId);

          setGroup(_group);
          setLoading(false);
        }
      } catch (error) {
        console.log(error, "Error fetching group");
      }
    };
    fetchGroup();
  }, [group, groupId]);
  return { group, loading };
}

export default useGetGroupById;
