import Header from "@/components/Header";
import ChallengeRows from "@/components/Challenges/ChallengeRows";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import HorizontalSwipe from "@/components/Images/HorizontalSwipe";

const Discover: React.FC = () => {
  return (
    <IonPage>
      <Header title="Discover" size={"big"} />
      <IonContent className="ion-padding" color="light">
        <HorizontalSwipe></HorizontalSwipe>
        <ChallengeRows />
      </IonContent>
    </IonPage>
  );
};

export default Discover;
