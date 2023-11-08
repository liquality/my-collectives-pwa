import { useState, useEffect } from "react";
import MoralisService from "@/services/MoralisService";

export function useGetLeaderboard() {
  const queryParams = new URLSearchParams(location.search);
  const contractAddress = queryParams.get("contractAddress");
  const tokenId = queryParams.get("tokenId");

  const [leaderboard, setLeaderboard] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!leaderboard && tokenId && contractAddress) {
          setLoading(true);
          const _leaderboard = await MoralisService.getLeaderboard(
            tokenId,
            contractAddress
          );
          setLeaderboard(_leaderboard);
          setLoading(false);
        }
      } catch (err) {
        setError('Error fetching leaderboard')
        console.log(err, error);
      }
    };
    fetchData();
  }, [leaderboard]);
  return { leaderboard, loading, error };
}

export default useGetLeaderboard;
