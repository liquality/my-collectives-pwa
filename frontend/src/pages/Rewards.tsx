import Header from "@/components/Header";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Rewards: React.FC = () => {
  return (
    <IonPage >
      <Header title="Rewards"/>
      <IonContent  className="ion-padding" color="light">Rewards</IonContent>
    </IonPage>
  );
};

export default Rewards;
