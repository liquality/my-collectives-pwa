import Header from '@/components/Header';
import { IonContent, IonPage } from '@ionic/react';

const Pools: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        Pools
      </IonContent>
    </IonPage>
  );
};

export default Pools;
