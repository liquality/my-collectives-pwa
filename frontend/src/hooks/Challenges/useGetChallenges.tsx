import { useState, useEffect } from "react";
import ApiService from "@/services/ApiService";

export function useGetChallenges() {
  const [challenges, setChallenges] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!challenges) {
          setLoading(true);
          const _challenges = await ApiService.readChallenges();
          setChallenges(_challenges);
          setLoading(false);
        }
      } catch (error) {
        console.log(error, "Error fetching token metadata");
      }
    };
    fetchData();
  }, [challenges]);
  return { challenges, loading };
}

export default useGetChallenges;
