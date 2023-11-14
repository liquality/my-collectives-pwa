import Header from "@/components/Header";
import ChallengeRows from "@/components/Challenges/ChallengeRows";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import HorizontalSwipe from "@/components/Images/HorizontalSwipe";
import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import PageTopBar from "@/components/PageTopBar";

const New: React.FC = () => {
  const { challenges, loading } = useGetChallenges();
  return (
    <IonPage>
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
      </IonContent>
    </IonPage>
  );
};

export default New;
