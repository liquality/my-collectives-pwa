import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Auth from "@/components/Auth";
import { checkAuth } from "@/utils";

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {checkAuth() ? <p>Home Page</p> : <p>Login Page</p>}{" "}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Auth />
      </IonContent>
    </IonPage>
  );
};

export default Settings;
