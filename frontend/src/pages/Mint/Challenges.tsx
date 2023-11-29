import Header from "@/components/Header";
import ChallengeRows from "@/components/Challenges/ChallengeRows";
import { IonContent, IonPage } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { useEffect, useState } from "react";
export interface ChallengesPageProps
  extends RouteComponentProps<{
    id?: string;
  }> {}

const Challenges: React.FC<ChallengesPageProps> = ({ match }) => {
  const { id } = match.params;
  const [activeChallenge, setActiveChallenge] = useState<string>(null);
  useEffect(() => {
    setActiveChallenge(id || "");
  }, [id]);
  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <ChallengeRows />
      </IonContent>
    </IonPage>
  );
};

export default Challenges;
