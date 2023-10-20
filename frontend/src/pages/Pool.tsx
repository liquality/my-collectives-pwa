import Header from "@/components/Header";
import PoolLeaderboard from "@/components/Pools/PoolLeaderboard";
import PoolRows from "@/components/Pools/PoolRows";
import useGetLeaderboard from "@/hooks/Pools/useGetLeaderboard";
import useGetPoolsMetadata from "@/hooks/Pools/useGetPoolsMetadata";
import { IonContent, IonImg, IonPage, IonTitle } from "@ionic/react";
import { useEffect } from "react";

const Pool: React.FC = () => {
  const queryParams = new URLSearchParams(location.search);
  const contractAddress = queryParams.get("contractAddress");
  const tokenId = queryParams.get("tokenId");
  const imageUrl =
    queryParams.get("imageUrl") ??
    "https://ionicframework.com/docs/img/demos/avatar.svg";

  const { leaderboard, loading } = useGetLeaderboard();
  console.log(leaderboard, "wats leaderboard?");

  useEffect(() => {}, []);
  return (
    <IonPage className="page-padding">
      <Header />
      <IonContent fullscreen>
        <IonTitle>#{tokenId}</IonTitle>
        <IonImg
          className=""
          style={{ width: "500px", height: "500px" }}
          src={imageUrl}
          alt="NFT Img"
        />
        <PoolLeaderboard />
      </IonContent>
    </IonPage>
  );
};

export default Pool;
