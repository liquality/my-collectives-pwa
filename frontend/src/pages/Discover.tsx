import Header from "@/components/Header";
import PoolRows from "@/components/Pools/PoolRows";
import useWindowDimensions from "@/hooks/userWindowsDimensions";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Discover: React.FC = () => {
  const { height, width, isDesktop } = useWindowDimensions();
  return (
    <IonPage className="page-padding">
      <Header />
      <IonContent fullscreen>
        <PoolRows />
      </IonContent>
    </IonPage>
  );
};

export default Discover;
