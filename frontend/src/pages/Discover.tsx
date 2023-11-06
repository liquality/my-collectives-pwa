import Header from "@/components/Header";
import PoolRows from "@/components/Pools/PoolRows";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Discover: React.FC = () => {
  return (
    <IonPage>
      <Header title="Discover"/>
      <IonContent className="ion-padding" color="light">
        <PoolRows />
      </IonContent>
    </IonPage>
  );
};

export default Discover;
