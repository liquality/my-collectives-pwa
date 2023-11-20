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

const New: React.FC<RouteComponentProps> = (routerProps) => {
  const { challenges, loading } = useGetChallenges();
  const page = useRef(undefined);
  const createChallengeModal = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function hideCreateChallengeModal() {
    createChallengeModal.current?.dismiss();
  }

  function handleCreateChallenge(groupId: number) {
    hideCreateChallengeModal();
    //reloadChallenges();
    // router.push(`messages/${groupId}`);
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

        <CreateGroupModal
          trigger="open-create-challenge-modal"
          ref={createChallengeModal}
          presentingElement={presentingElement}
          dismiss={hideCreateChallengeModal}
          onSuccess={handleCreateChallenge}
        />
      </IonContent>
    </IonPage>
  );
};

export default New;
