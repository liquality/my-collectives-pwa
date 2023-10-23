import Header from "@/components/Header";
import PoolRows from "@/components/Pools/PoolRows";
import useGetPoolsMetadata from "@/hooks/Pools/useGetPoolsMetadata";
import { IonContent, IonPage } from "@ionic/react";

const Pools: React.FC = () => {
  const { tokenData, loading } = useGetPoolsMetadata();

  return (
    <IonPage className="page-padding">
      <Header />
      <IonContent fullscreen>
        Pools
        <PoolRows />
      </IonContent>
    </IonPage>
  );
};

export default Pools;
