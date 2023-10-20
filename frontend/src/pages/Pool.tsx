import Header from "@/components/Header";
import PoolRows from "@/components/Pools/PoolRows";
import useGetPoolsMetadata from "@/hooks/Pools/useGetPoolsMetadata";
import { IonContent, IonPage } from "@ionic/react";
import { useEffect } from "react";

const Pool: React.FC = () => {
  const queryParams = new URLSearchParams(location.search);
  //TODO: hook here to fetch specific contract + top contributor leaderboard data

  const contractAddress = queryParams.get("contractAddress");
  const tokenId = queryParams.get("tokenId");

  useEffect(() => {}, []);
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>Pool page! {tokenId}</IonContent>
    </IonPage>
  );
};

export default Pool;
