import {
  IonButton,
  IonContent,
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
import { useEffect, useRef, useState } from "react";
import CreateGroupModal from "./CreateChallengeModal";
import { Challenge } from "@/types/challenges";

const New: React.FC<RouteComponentProps> = (routerProps) => {
  const { challenges, loading, setChallenges } = useGetChallenges();
  const page = useRef(undefined);
  const createChallengeModal = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);
  const [resultChallenge, setResultChallenge] = useState<Challenge | null>(
    null
  );

  useEffect(() => {
    //If a new challenge has been created, push into exisitng challenge array state to avoid re-fetching of challenges
    if (resultChallenge) {
      setChallenges((prevGroups: Challenge[]) => [
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
  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <DiscoverTopBar {...routerProps}>
          <PageSearchBar />
        </DiscoverTopBar>

        <IonButton
          id="open-create-challenge-modal"
          color="primary"
          shape="round"
          expand="block"
        >
          CREATE CHALLENGE
        </IonButton>

        <CreateGroupModal
          trigger="open-create-challenge-modal"
          ref={createChallengeModal}
          presentingElement={presentingElement}
          dismiss={hideCreateChallengeModal}
          onSuccess={handleCreateChallenge}
          resultChallenge={resultChallenge}
          setResultChallenge={setResultChallenge}
        />

        <div className="spaced-on-sides">
          <IonLabel>Art | {challenges?.length}</IonLabel>
          <IonLabel color="primary">See All</IonLabel>
        </div>

        <HorizontalSwipe
          imageData={challenges}
          loading={loading}
        ></HorizontalSwipe>

        <div className="spaced-on-sides">
          <IonLabel>Music | {challenges?.length}</IonLabel>
          <IonLabel color="primary">See All</IonLabel>
        </div>
        <HorizontalSwipe
          imageData={challenges}
          loading={loading}
        ></HorizontalSwipe>
      </IonContent>
    </IonPage>
  );
};

export default New;
