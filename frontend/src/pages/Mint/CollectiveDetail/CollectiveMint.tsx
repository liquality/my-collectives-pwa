import {
  IonCol,
  IonContent,
  IonGrid,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import Header from "@/components/Header";
import { RouteComponentProps } from "react-router";
import CollectiveTopBar from "@/components/TopBars/CollectiveTopBar";
import PageSearchBar from "@/components/PageSearchBar";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";
import useGetChallengesByGroupId from "@/hooks/Collective/useGetChallengesByGroupId";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import { useSignInWallet } from "@/hooks/useSignInWallet";
import { Challenge, GroupedChallenge } from "@/types/challenges";
import { useEffect, useMemo, useState } from "react";
import HorizontalSwipe from "@/components/Images/HorizontalSwipe";
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

  const onChallengeSelected = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
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

  const groupedChallenges: GroupedChallenge = useMemo(() => {
    return (
      challenges?.reduce((rv: GroupedChallenge, x: Challenge) => {
        (rv[x["category"]] = rv[x["category"]] || []).push(x);
        return rv;
      }, {}) || {}
    );
  }, [challenges]);

  return (
    <IonPage>
      <Header title={group?.name} />
      <IonContent className="ion-padding" color="light">
        <CollectiveTopBar>
          <PageSearchBar />
        </CollectiveTopBar>
        {loading ? (
          <PageLoadingIndicator />
        ) : challenges ? (
          Object.keys(groupedChallenges).map((category: string) => (
            <div key={category}>
              <div className="spaced-on-sides">
                <IonLabel className="ion-text-capitalize">
                  {category} | {groupedChallenges[category]?.length}
                </IonLabel>
                <IonLabel color="primary">See All</IonLabel>
              </div>
              <HorizontalSwipe
                imageData={groupedChallenges[category]}
                setSelectedChallenge={onChallengeSelected}
                loading={loading}
              ></HorizontalSwipe>
            </div>
          ))
        ) : (
          <IonGrid>
            <IonRow className="ion-text-center">
              <IonCol>
                <h3>No challenges found</h3>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
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
