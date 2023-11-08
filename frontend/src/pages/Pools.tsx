import Header from "@/components/Header";
import PoolRows from "@/components/Pools/PoolRows";
import useGetChallenges from "@/hooks/Pools/useGetChallenges";
import { IonContent, IonPage } from "@ionic/react";

const Pools: React.FC = () => {
  const { tokenData, loading } = useGetChallenges();

  return (
    <IonPage>
      <Header title="Pools" />
      <IonContent className="ion-padding" color="light">
        Pools
        <PoolRows />
      </IonContent>
    </IonPage>
  );
};

export default Pools;
