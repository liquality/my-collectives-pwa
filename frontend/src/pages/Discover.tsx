import Header from "@/components/Header";
import useWindowDimensions from "@/hooks/userWindowsDimensions";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Discover: React.FC = () => {

  const { height, width, isDesktop} = useWindowDimensions();
  return (
    <IonPage className="page-padding">
      <Header />
      <IonContent fullscreen>
      <div>
      width: {width} ~ height: {height} ~ isDesktop: {`${isDesktop}`}
    </div>
        Home</IonContent>
    </IonPage>
  );
};

export default Discover;
