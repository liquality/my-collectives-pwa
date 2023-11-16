import { IonContent, IonPage } from "@ionic/react";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";

export interface ManageCollectiveProps {
  group?: any;
  loading: boolean;
}

const ManageCollective = ({ group, loading }: ManageCollectiveProps) => {
  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <p>Manage Collective/group settings page here</p>
      </IonContent>
    </IonPage>
  );
};

export default ManageCollective;
