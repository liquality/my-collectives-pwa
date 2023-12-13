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
import MintItemScreen from "../Mint/MintItemScreen";
export interface ChallengeItemMintModalProps {
  dismiss: () => void;
  challenge: Challenge;
  isOpen: boolean;
  presentingElement?: HTMLIonModalElement | null;
}

const ChallengeItemMintModal = ({
  dismiss,
  challenge,
  isOpen,
  presentingElement,
}: ChallengeItemMintModalProps) => {

  return (
    <IonModal isOpen={isOpen} presentingElement={presentingElement!}>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="dark" onClick={()=> dismiss()}>
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Mint</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <MintItemScreen challenge={challenge} />
      </IonContent>
    </IonModal>
  );
};

export default ChallengeItemMintModal;
