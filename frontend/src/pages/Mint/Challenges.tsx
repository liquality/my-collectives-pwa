import Header from "@/components/Header";
import ChallengeRows from "@/components/Challenges/ChallengeRows";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { useEffect, useState } from "react";
import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import ChallengeItemCard from "@/components/Challenges/ChallengeItemCard";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
export interface ChallengesPageProps
  extends RouteComponentProps<{
    id?: string;
  }> {}

const Challenges: React.FC<ChallengesPageProps> = ({ match }) => {
  const { id } = match.params;

  const { challenges, loading } = useGetChallenges();
  const [activeChallenge, setActiveChallenge] = useState<any>();
  useEffect(() => {
    if (id && challenges) {
      const index = challenges.findIndex(
        (challenge: any) => challenge.id === id
      );
      if (index >= 0) {
        setActiveChallenge(challenges[index]);
      }
    }
  }, [id, challenges]);

  const getActiveChallenge = () => {};
  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <IonGrid>
          {loading ? (
            <PageLoadingIndicator />
          ) : challenges ? (
            activeChallenge ? (
              <ChallengeItemCard {...activeChallenge} />
            ) : (
              <IonRow style={{ margin: "1rem" }}>
                {challenges.map((challenge: any) => (
                  <IonCol
                    key={challenge.id}
                    size="12"
                    sizeSm="6"
                    sizeMd="4"
                    sizeLg="3"
                  >
                    <ChallengeItemCard {...challenge} />
                  </IonCol>
                ))}
              </IonRow>
            )
          ) : (
            <IonRow className="ion-text-center">
              <IonCol>
                <h3>No challenges found</h3>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Challenges;
