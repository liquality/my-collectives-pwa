import { IonContent, IonPage } from "@ionic/react";
import HorizontalSwipe from "@/components/Images/HorizontalSwipe";
import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import { RouteComponentProps } from "react-router";
import PageSearchBar from "@/components/PageSearchBar";
import DiscoverTopBar from "./DiscoverTopBar";

const New: React.FC<RouteComponentProps> = (routerProps) => {
  const { challenges, loading } = useGetChallenges();
  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <DiscoverTopBar {...routerProps}>
          <PageSearchBar />
        </DiscoverTopBar>
        <div className="spaced-on-sides">
          <p>Art | {challenges?.length}</p>
          <p>See All</p>
        </div>

        <HorizontalSwipe
          imageData={challenges}
          loading={loading}
        ></HorizontalSwipe>

        <div className="spaced-on-sides">
          <p>Music | {challenges?.length}</p>
          <p>See All</p>
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