import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import Header from "@/components/Header";
import { RouteComponentProps } from "react-router";
import CollectiveTopBar from "@/components/TopBars/CollectiveTopBar";
import PageSearchBar from "@/components/PageSearchBar";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";
import useGetChallengesByGroupId from "@/hooks/Collective/useGetChallengesByGroupId";
import PoolsGrid from "@/components/Mint/PoolsGrid";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import { useSignInWallet } from "@/hooks/useSignInWallet";
import { Challenge } from "@/types/challenges";
import { useEffect, useState } from "react";
import ChallengeItemCard from "@/components/Challenges/ChallengeItemCard";
import ChallengeItemModal from "@/components/ChallengesModal/ChallengeItemModal";

export interface CollectiveMintProps
  extends RouteComponentProps<{
    groupId: string;
    challengeId: string;
  }> {}

const CollectiveMint: React.FC<CollectiveMintProps> = ({ match }) => {
  const { groupId, challengeId } = match.params;
  const { group } = useGetGroupById(groupId);
  const { pools: challenges, loading } = useGetChallengesByGroupId(groupId);

  const [itemModalIsOpen, setItemModalIsOpen] = useState(false);
  const { user } = useSignInWallet();
  const [selectedChallenge, setSelectedChallenge] = useState<
    Challenge | undefined | null
  >();

  const onCloseChallenteItemModal = () => {
    setSelectedChallenge(null);
  };

  const onChallengeSelected = (challengeId: string) => {
    const index = challenges.findIndex(
      (challenge: any) => challenge.id === challengeId
    );
    if (index >= 0) {
      setSelectedChallenge(challenges[index]);
    }
  };

  useEffect(() => {
    if (challengeId && challenges) {
      const index = challenges.findIndex(
        (challenge: any) => challenge.id === challengeId
      );
      if (index >= 0) {
        setSelectedChallenge(challenges[index]);
      }
    }
  }, [challengeId, challenges]);

  useEffect(() => {
    if (selectedChallenge) {
      !itemModalIsOpen && setItemModalIsOpen(true);
    } else {
      setItemModalIsOpen(false);
    }
  }, [selectedChallenge, user]);

  return (
    <IonPage>
      <Header title={group?.name} />
      <IonContent className="ion-padding" color="light">
        <CollectiveTopBar>
          <PageSearchBar />
        </CollectiveTopBar>
        <IonGrid>
          {loading ? (
            <PageLoadingIndicator />
          ) : challenges ? (
            <IonRow style={{ margin: "1rem" }}>
              {challenges.map((challenge: any, index: number) => (
                <IonCol key={index} size="12" sizeSm="6" sizeMd="4" sizeLg="3">
                  <ChallengeItemCard
                    {...challenge}
                    onChallengeSelected={onChallengeSelected}
                  />
                </IonCol>
              ))}
            </IonRow>
          ) : (
            <IonRow className="ion-text-center">
              <IonCol>
                <h3>No challenges found</h3>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
        <ChallengeItemModal
          isOpen={itemModalIsOpen}
          challenges={challenges || []}
          selectedChallengeId={selectedChallenge?.id}
          dismiss={onCloseChallenteItemModal}
        />
      </IonContent>
    </IonPage>
  );
};

export default CollectiveMint;
