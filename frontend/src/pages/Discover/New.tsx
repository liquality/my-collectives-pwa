import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonPage,
} from "@ionic/react";
import HorizontalSwipe from "@/components/Images/HorizontalSwipe";
import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { RouteComponentProps } from "react-router";
import PageSearchBar from "@/components/PageSearchBar";
import DiscoverTopBar from "./DiscoverTopBar";
import { useEffect, useMemo, useRef, useState } from "react";
import CreateChallengeModal from "./CreateChallengeModal";
import { Challenge, GroupedChallenge } from "@/types/challenges";
import ChallengeItemModal from "@/components/ChallengesModal/ChallengeItemModal";
import { useSignInWallet } from "@/hooks/useSignInWallet";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";

const New: React.FC<RouteComponentProps> = (routerProps) => {
  const {
    challenges,
    loading: loadingChallenges,
    setChallenges,
  } = useGetChallenges();
  const page = useRef(undefined);
  const createChallengeModal = useRef<HTMLIonModalElement>(null);
  const [itemModalIsOpen, setItemModalIsOpen] = useState(false);
  const { user } = useSignInWallet();

  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);
  const [resultChallenge, setResultChallenge] = useState<Challenge | null>(
    null
  );

  const [selectedChallenge, setSelectedChallenge] = useState<
    Challenge | undefined | null
  >();
  useEffect(() => {
    // If a new challenge has been created, push into existing challenge array state to avoid re-fetching of challenges
    if (resultChallenge) {
      setChallenges((prevGroups: Challenge[] | null) => [
        ...(prevGroups || []),
        resultChallenge,
      ]);
    }
    setPresentingElement(page.current);
  }, [resultChallenge]);

  function hideCreateChallengeModal() {
    createChallengeModal.current?.dismiss();
  }

  function handleCreateChallenge(groupId: number) {
    hideCreateChallengeModal();
  }

  const onChallengeSelected = async (challenge: Challenge) => {
    setSelectedChallenge(challenge);
  };

  const onCloseChallenteItemModal = () => {
    setSelectedChallenge(null);
  };

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

  console.log(challenges, "challenges");
  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <DiscoverTopBar {...routerProps}>
          <PageSearchBar />
        </DiscoverTopBar>

        {user?.isCreator ? (
          <>
            {" "}
            <IonFab slot="fixed" vertical="bottom" horizontal="end">
              <IonFabButton
                id="open-create-challenge-modal"
                className="create-fab-button"
                disabled={!user}
              >
                <IonIcon src="/assets/icons/add.svg"></IonIcon>
                <IonLabel>Create Challenge</IonLabel>
              </IonFabButton>
            </IonFab>
            <CreateChallengeModal
              trigger="open-create-challenge-modal"
              ref={createChallengeModal}
              presentingElement={presentingElement}
              dismiss={hideCreateChallengeModal}
              onSuccess={handleCreateChallenge}
              resultChallenge={resultChallenge}
              setResultChallenge={setResultChallenge}
            />
          </>
        ) : null}
        {loadingChallenges ? (
          <PageLoadingIndicator />
        ) : (
          Object.keys(groupedChallenges).map((category: string) => (
            <div key={category}>
              <div className="spaced-on-sides">
                <IonLabel className="ion-text-capitalize">
                  {category} | {groupedChallenges[category]?.length}
                </IonLabel>
                {challenges ? (
                  <IonLabel
                    onClick={() => onChallengeSelected(challenges[0])}
                    color="primary"
                  >
                    See All
                  </IonLabel>
                ) : null}
              </div>
              <HorizontalSwipe
                imageData={groupedChallenges[category]}
                setSelectedChallenge={onChallengeSelected}
                loading={loadingChallenges}
              ></HorizontalSwipe>
            </div>
          ))
        )}

        <ChallengeItemModal
          isOpen={itemModalIsOpen}
          challenges={
            selectedChallenge
              ? groupedChallenges[selectedChallenge.category]
              : challenges || []
          }
          selectedChallengeId={selectedChallenge?.id}
          presentingElement={presentingElement!}
          dismiss={onCloseChallenteItemModal}
        />
      </IonContent>
    </IonPage>
  );
};

export default New;
