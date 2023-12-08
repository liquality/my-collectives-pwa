import { useState, useEffect } from "react";
import ApiService from "@/services/ApiService";

export function useGetMintActivity(
  contractAddress: string,
  network: string,
  tokenId: string
) {
  const [mintActivity, setMintActivity] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!mintActivity && network && contractAddress) {
          setLoading(true);
          const _leaderboard = await ApiService.getLeaderboardMintActivity(
            contractAddress,
            network,
            tokenId
          );
          setMintActivity(_leaderboard);
          setLoading(false);
        }
      } catch (err) {
        setError("Error fetching leaderboard");
        console.log(err, error);
      }
    };
    fetchData();
  }, [mintActivity]);
  return { mintActivity, loading, error };
}

export default useGetMintActivity;
