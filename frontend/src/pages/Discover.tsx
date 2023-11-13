import Header from "@/components/Header";
import ChallengeRows from "@/components/Challenges/ChallengeRows";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import HorizontalSwipe from "@/components/Images/HorizontalSwipe";
import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import About from "./About";

const Discover: React.FC = () => {
  const { challenges, loading } = useGetChallenges();
  return (
    <IonPage>
      <Header title="Discover" size={"big"} />
      <IonContent className="ion-padding" color="light">
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
        <About />
      </IonContent>
    </IonPage>
  );
};

export default Discover;
