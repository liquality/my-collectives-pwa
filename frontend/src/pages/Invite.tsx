import { IonCol, IonContent, IonGrid, IonPage, IonRow, useIonRouter } from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { routes } from "@/utils/routeNames";

const Invite: React.FC<RouteComponentProps> = ({ location }) => {

  const router = useIonRouter();
  const query = new URLSearchParams(location.search);

  const code = query.has("code") ? query.get("code") : null;
  const id = query.has("id") ? query.get("id") : null;

  
  const ValidCode = () => {

  };

  const NotFoundNotVallidd = () => {
    // TODO: Add error message
  };

  const SuccessResult = () => {

  };

  const ErrorResult = () => {

  };
  const pageClassName = !!id ? 'ion-padding invite-page-link' : 'ion-padding invite-page-code';
  return (
    <IonPage>
      <IonContent fullscreen={true} className={pageClassName}>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <h1>Invite</h1>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Invite;
