import Header from "@/components/Header";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Settings: React.FC = () => {
  return (
    <IonPage>
      <Header title="Settings"/>
      <IonContent  className="ion-padding" color="light">Settings</IonContent>
    </IonPage>
  );
};

export default Settings;
