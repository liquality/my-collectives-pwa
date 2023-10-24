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
    <IonPage className="page-padding">
      <Header />
      <IonContent fullscreen>Rewards</IonContent>
    </IonPage>
  );
};

export default Rewards;
