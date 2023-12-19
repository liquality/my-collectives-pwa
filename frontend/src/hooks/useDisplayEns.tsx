import { fetchEns } from "@/utils/ensName";
import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";

export function useDisplayEns(address: `0x${string}` | undefined) {
  const [loading, setLoading] = useState(true);
  const [ens, setEns] = useState<string | null>(null);
  const { chain } = useNetwork();

  useEffect(() => {
    const fetchData = async () => {
      if (!ens && address && chain?.id) {
        setLoading(false);
        const _ens = await fetchEns(address, chain.id);
        setEns(_ens);
      }
    };

    fetchData();
  }, []);
  return { loading, ens };
}
