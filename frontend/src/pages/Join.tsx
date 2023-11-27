import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonPage,
  IonRow,
  IonSpinner,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import InvitesService from "@/services/Invites";
import { pathConstants } from "@/utils/routeNames";
const Join: React.FC = () => {
  const [code, setCode] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const router = useIonRouter();

  async function confirmInvite() {
    setLoading(true);
    if (code) {
      const invite = await InvitesService.getInviteByCode(code);
      if (invite) {
        router.push(`${pathConstants.invite.index}/${invite.id}`, "root");
      } else {
        setErrorMessage("Invalid Code, please check and try again.");
      }
    } else {
      setErrorMessage("The Invite Code is required.");
    }
    setLoading(false);
  }

  function enterWithoutInvite() {
    router.push("/");
  }

  function handleCodeInput(value: string) {
    if (value) {
      setErrorMessage("");
    }
    setCode(value);
  }

  return (
    <IonPage>
      <IonContent
        fullscreen={true}
        className="ion-padding invite-page invite-page-code"
      >
        <IonGrid className="invite-content">
          <IonRow className="ion-margin-top">
            <IonCol size="12" className="ion-padding ion-text-center">
              <h1 className="title">
                MyCollective<span className="tech">.tech</span>
              </h1>
              <div className="subtitle">Discover, Mint & Earn with Friends</div>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-top">
            <IonCol size="12" className="ion-padding ion-text-center">
              <h1 className="greetings">You are Invited!</h1>
              <div className="message">
                Team up to discover, mint and promote collectibles, and take
                part in fun challenges!
              </div>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin ion-padding">
            <IonCol size="12" className="ion-padding">
              <IonInput
                disabled={loading}
                label="ENTER CODE"
                type="text"
                labelPlacement="stacked"
                placeholder="00000000"
                helperText="Invites are unique and valid until you use"
                errorText={errorMessage}
                onIonInput={(e) => handleCodeInput(e.detail.value!)}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow className="ion-margin-top">
            <IonCol size="12" className="ion-text-center">
              <IonButton
                disabled={loading}
                shape="round"
                fill="solid"
                className="invite-action-btn"
                onClick={confirmInvite}
              >
                {loading ? (
                  <IonSpinner name="circular"></IonSpinner>
                ) : (
                  "Confirm Invite"
                )}
              </IonButton>
            </IonCol>
            <IonCol size="12" className="ion-text-center">
              <IonButton
                disabled={loading}
                fill="clear"
                className="invite-clear-btn"
                onClick={enterWithoutInvite}
              >
                Enter Without Invite
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Join;
