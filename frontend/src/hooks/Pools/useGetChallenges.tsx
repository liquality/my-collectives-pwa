import { useState, useEffect } from "react";
import ApiService from "@/services/ApiService";

export function useGetChallenges() {
  const [tokenData, setTokenData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!tokenData) {
          setLoading(true);
          const _tokenData = await ApiService.readChallenges();
          setTokenData(_tokenData);
          setLoading(false);
        }
      } catch (error) {
        console.log(error, "Error fetching token metadata");
      }
    };
    fetchData();
  }, [tokenData]);
  return { tokenData, loading };
}

export default useGetChallenges;
