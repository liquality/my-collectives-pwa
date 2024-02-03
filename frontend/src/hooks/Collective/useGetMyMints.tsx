import { useState, useEffect } from "react";
import ApiService from "@/services/ApiService";

export function useGetMyMints() {
  const [myMints, setMyMints] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!myMints) {
          setLoading(true);
          const _myMints = await ApiService.getMyMints();
          setMyMints(_myMints);
          setLoading(false);
        }
      } catch (err) {
        setError("Error fetching myMints");
        console.log(err, error);
      }
    };
    fetchData();
  }, [myMints]);
  return { myMints, loading, error };
}

export default useGetMyMints;
