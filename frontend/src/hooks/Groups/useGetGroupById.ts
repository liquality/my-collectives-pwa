import { useState, useEffect } from "react";
import { Group } from "@/types/general-types";
import ApiService from "@/services/ApiService";

export function useGetGroupById(groupId: string) {
  const [group, setGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        if ((!group || group?.id !== groupId) && groupId) {
          setLoading(true);
          const _group: Group = await ApiService.readGroup(groupId);

          setGroup(_group);
          const _members = await ApiService.getGroupMembers(groupId);
          setMembers(_members);
          setLoading(false);
        }
      } catch (error) {
        console.log(error, "Error fetching group");
        setLoading(false);
      }
    };
    fetchGroup();
  }, [group, groupId]);
  return { group, members, loading };
}

export default useGetGroupById;
