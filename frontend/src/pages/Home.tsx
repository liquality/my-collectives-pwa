import Header from "@/components/Header";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Home: React.FC = () => {
  return (
    <IonPage className="page-padding">
      <Header />
      <IonContent fullscreen>Home</IonContent>
    </IonPage>
  );
};

export default Home;
