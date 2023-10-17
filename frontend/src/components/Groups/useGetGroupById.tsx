import { useState, useEffect } from "react";
import { Group } from "@/types/chat";
import UserService from "@/services/UserService";

export function useGetGroupById(groupId: string) {
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        if (!group) {
          setLoading(true);
          console.log(groupId, typeof groupId, "typeof groupud");
          const _group: Group = await UserService.readGroup(groupId);
          console.log(_group, "GROUPP?");
          setGroup(_group);
          setLoading(false);
        }
      } catch (error) {
        console.log(error, "Error fetching group");
      }
    };
    fetchGroup();
  }, [group]);
  return { group, loading };
}

export default useGetGroupById;
