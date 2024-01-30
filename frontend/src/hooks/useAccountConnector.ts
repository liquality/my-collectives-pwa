import ContractService from "@/services/ContractService";
import { useAccount } from "wagmi";

export function useAccountConnector() {
  const { connector } = useAccount({
    onConnect: (conn) => {
      console.log("on connect", conn.address);
      ContractService.setConnector(conn.connector);
    },
    onDisconnect: () => {
      console.log("on disconnect");
      ContractService.setConnector();
    },
  });

  connector?.on("change", (data) => {
    console.log("on change", data);
    ContractService.setConnector(connector);
  });
}
