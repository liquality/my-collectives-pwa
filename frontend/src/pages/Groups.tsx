import Header from '@/components/Header';
import { IonContent, IonPage } from '@ionic/react';

const Groups: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        Groups
      </IonContent>
    </IonPage>
  );
};

export default Groups;
