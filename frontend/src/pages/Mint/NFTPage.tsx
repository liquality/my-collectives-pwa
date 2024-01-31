import Header from "@/components/Header";
import MintItemScreen from "@/components/Mint/MintItemScreen";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import ApiService from "@/services/ApiService";
import { Challenge } from "@/types/challenges";
import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
export interface NFTPageProps
  extends RouteComponentProps<{
    challengeId: string;
  }> {}
const NFTPage: React.FC<NFTPageProps> = ({ match }) => {
  const { challengeId } = match.params;
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!challenge && challengeId) {
          const _challenge = await ApiService.readChallenge(challengeId);
          setChallenge(_challenge);
        }
      } catch (error) {
        console.log(error, "Error fetching challenge data");
      }
      setLoading(false);
    };
    fetchData();
  }, [challengeId]);

  return (
    <IonPage>
       <Header title="Mint" />
      <IonContent className="ion-padding" color="light">
        {loading ? (
          <PageLoadingIndicator />
        ) : challenge && (
          <MintItemScreen challenge={challenge} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default NFTPage;
