import Header from "@/components/Header";
import PoolRows from "@/components/Pools/PoolRows";
import useGetPoolsMetadata from "@/hooks/Pools/useGetPoolsMetadata";
import { IonContent, IonPage } from "@ionic/react";

const Pools: React.FC = () => {
  const { tokenData, loading } = useGetPoolsMetadata();
  console.log(
    tokenData,
    "wats tokendata?",
    import.meta.env.VITE_MORALIS_API_KEY,
    import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
  );
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        Pools
        <PoolRows />
      </IonContent>
    </IonPage>
  );
};

export default Pools;
