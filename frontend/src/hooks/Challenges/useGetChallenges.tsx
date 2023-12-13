import { useState, useEffect } from "react";
import ApiService from "@/services/ApiService";
import { Challenge } from "@/types/challenges";

export function useGetChallenges() {
  const [challenges, setChallenges] = useState<Challenge[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!challenges) {
          const _challenges = await ApiService.readChallenges();
          setChallenges(_challenges);
        }
      } catch (error) {
        console.log(error, "Error fetching token metadata");
      }
      setLoading(false);
    };
    fetchData();
  }, [challenges]);
  return { challenges, setChallenges, loading };
}

export default useGetChallenges;
