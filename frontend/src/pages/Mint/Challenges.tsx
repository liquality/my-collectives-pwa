import Header from "@/components/Header";
import ChallengeRows from "@/components/Challenges/ChallengeRows";
import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { IonContent, IonPage } from "@ionic/react";

export interface ChallengesComponentProps {
  group?: any;
  loading: boolean;
}

const Challenges: React.FC<ChallengesComponentProps> = ({ group, loading }: ChallengesComponentProps) => {
  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <ChallengeRows />
      </IonContent>
    </IonPage>
  );
};

export default Challenges;
