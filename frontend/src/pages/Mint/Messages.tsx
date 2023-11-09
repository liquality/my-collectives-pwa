import Chat from "@/components/Chat";
import { IonContent, IonGrid, IonPage } from "@ionic/react";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";

export interface MessagesComponentProps {
  group?: any;
  loading: boolean;
}


const Messages = ({ group, loading }: MessagesComponentProps) => {
  const handleGoToGroupMessages = async () => {};
  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        {!loading && group ? (
          <Chat group={group} />
        ) : (
          <IonGrid>
            <PageLoadingIndicator />
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Messages;
