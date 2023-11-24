import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { routes } from "@/utils/routeNames";
import { useEffect, useState } from "react";
import InvitesService from "@/services/Invites";

export interface InvitePageProps
  extends RouteComponentProps<{
    id?: string;
    code?: string;
  }> {}
const Invite: React.FC<InvitePageProps> = ({ match }) => {
  const { id, code } = match.params;
  const [invite, setInvite] = useState<any>(null);

  useEffect(() => {
    if (id) {
      (async () => {
        const result = await InvitesService.getInvite(id);
        setInvite(result);
      })();
    } else if (code) {
      (async () => {
        const result = await InvitesService.getInviteByCode(code);
        setInvite(result);
      })();
    }
  }, [id, code]);
  const pageClassName = !!id
    ? "ion-padding invite-page invite-page-link"
    : "ion-padding invite-page invite-page-code";
  const inviteMessage = !!id ? "Invite Link" : "Invite Code";
  return (
    <IonPage>
      <IonContent fullscreen={true} className={pageClassName}>
        <IonGrid>
          <IonRow>
            <IonCol size="12" className="ion-padding ion-text-center">
              <h1 className="title">
                MyCollective<span className="tech">.tech</span>
              </h1>
              <div className="subtitle">Discover, Mint & Earn with Friends</div>
            </IonCol>
          </IonRow>
          {invite ? (
            <IonRow>
              <IonCol size="12" className="ion-padding ion-text-center">
              <IonIcon className="greetings-icon" src="./assets/icons/congrats.svg" />
                <h1 className="greetings">CONTRATS!</h1>
                <div className="message">
                  <small>
                    <b>{invite.userAddress}</b>
                  </small>{" "}
                  invited you to join{" "}
                  <small>
                    <b>{invite.groupName}!</b>
                  </small>
                </div>
              </IonCol>
            </IonRow>
          ) : (
            <IonRow>
              <IonCol size="12" className="ion-padding ion-text-center">
                <h1>CONTRATS</h1>
                <div className="subtitle">{inviteMessage}</div>
              </IonCol>
            </IonRow>
          )}

          <IonRow>
            <IonCol size="12" className="ion-padding ion-text-center">
              Code / Group Details
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="ion-padding ion-text-center">
              Connect
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Invite;
