import { IonContent, IonPage } from "@ionic/react";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";

export interface InfoComponentProps {
  group?: any;
  loading: boolean;
}

const Info = ({ group, loading}: InfoComponentProps) => {

  return (
    <IonPage>
      <IonContent className="ion-padding"  color="light">
       <p>Group into</p>
      </IonContent>
    </IonPage>
  );
};

export default Info;
