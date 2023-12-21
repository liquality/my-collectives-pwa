import ApiService from "@/services/ApiService";
import { useEffect, useState } from "react";

const userGetRewardsSummary = () => {
  const [summary, setSummary] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!summary) {
          setLoading(true);
          const result = await ApiService.getRewardsSummary();
          setSummary(result);
          setLoading(false);
        }
      } catch (error) {
        console.log(error, "Error fetching Rewards Summary");
      }
    };

    fetchData();
  }, [summary]);

  return { summary, loading };
};
export default userGetRewardsSummary;
