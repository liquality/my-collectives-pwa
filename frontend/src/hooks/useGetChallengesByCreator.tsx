import ApiService from "@/services/ApiService";
import ContractService from "@/services/ContractService";
import { useEffect, useState } from "react";

const useGetChallengesByCreator = () => {
  const [myChallenges, setMyChallenges] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!myChallenges) {
          setLoading(true);
          const result = await ApiService.readChallengesByCreator();
          console.log(result, "wats result");
          setMyChallenges(result);
          setLoading(false);
        }
      } catch (error) {
        console.log(error, "Error fetching Rewards Summary");
      }
    };

    fetchData();
  }, [myChallenges]);

  return { myChallenges, loading };
};
export default useGetChallengesByCreator;
