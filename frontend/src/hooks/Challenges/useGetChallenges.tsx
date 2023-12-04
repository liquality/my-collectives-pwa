import { useState, useEffect } from "react";
import ApiService from "@/services/ApiService";
import { Challenge } from "@/types/challenges";

export function useGetChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (challenges.length <= 0) {
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
  return { challenges, setChallenges, loading };
}

export default useGetChallenges;
