import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonIcon,
  IonModal,
} from "@ionic/react";
import { Challenge } from "@/types/challenges";
import { closeOutline } from "ionicons/icons";
export interface ChallengeItemMintModalProps {
  dismiss: () => void;
  challenge: Challenge;
  isOpen: boolean;
  presentingElement?: HTMLIonModalElement | null;
}

const ChallengeItemMintModal = ({
  dismiss,
  isOpen,
  presentingElement,
}: ChallengeItemMintModalProps) => {

  function handleDismiss() {
    dismiss();
  }


  return (
    <IonModal
      isOpen={isOpen}
      presentingElement={presentingElement!}
    >
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="dark" onClick={handleDismiss}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Mint</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>Mint Content</IonContent>
    </IonModal>
  );
};

export default ChallengeItemMintModal;
