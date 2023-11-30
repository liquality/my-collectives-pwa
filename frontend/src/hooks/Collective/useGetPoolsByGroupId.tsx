import { useState, useEffect } from "react";
import ApiService from "@/services/ApiService";

export function useGetPoolsByGroupId(groupId: string) {
  const [pools, setPools] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!pools && groupId) {
          setLoading(true);
          const _pools = await ApiService.readPoolsByGroupId(groupId);
          setPools(_pools);
          setLoading(false);
        }
      } catch (error) {
        console.log(error, "Error fetching pools for groupid");
      }
    };
    fetchData();
  }, [pools, groupId]);
  return { pools, setPools, loading };
}

export default useGetPoolsByGroupId;
