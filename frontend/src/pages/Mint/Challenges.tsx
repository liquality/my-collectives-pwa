import Header from "@/components/Header";
import ChallengeRows from "@/components/Challenges/ChallengeRows";
import { IonContent, IonPage } from "@ionic/react";

const Challenges: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <ChallengeRows />
      </IonContent>
    </IonPage>
  );
};

export default Challenges;
