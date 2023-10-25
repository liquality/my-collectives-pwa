import { useState, useEffect } from "react";
import MoralisService from "@/services/MoralisService";
import ApiService from "@/services/ApiService";

export function useGetPoolsMetadata() {
  const [tokenData, setTokenData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!tokenData) {
          setLoading(true);
          const _tokenData = await ApiService.readPools();
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

export default useGetPoolsMetadata;
