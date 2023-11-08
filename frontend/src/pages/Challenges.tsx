import Header from "@/components/Header";
import ChallengeRows from "@/components/Challenges/ChallengeRows";
import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { IonContent, IonPage } from "@ionic/react";

const Challenges: React.FC = () => {
  return (
    <IonPage>
      <Header title="Challenges" />
      <IonContent className="ion-padding" color="light">
        Challenges
        <ChallengeRows />
      </IonContent>
    </IonPage>
  );
};

export default Challenges;
