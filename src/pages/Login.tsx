import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Auth from '@/components/Auth';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Auth />
      </IonContent>
    </IonPage>
  );
};

export default Settings;
