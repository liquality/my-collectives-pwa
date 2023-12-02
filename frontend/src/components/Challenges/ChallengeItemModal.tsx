import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  useIonModal,
  IonIcon,
  IonModal,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { ModalBreakpointChangeEventDetail } from "@ionic/core";
import ChallengeItemInfoSheetModal from "./ChallengeItemInfoSheetModal";
import { Ref, forwardRef, useEffect, useRef, useState } from "react";
import { Challenge } from "@/types/challenges";
import { closeOutline, arrowDownOutline } from "ionicons/icons";
import { convertIpfsImageUrl } from "@/utils";
import ImageLoader from "../Images/ImageLoader";
export interface ChallengeItemModalProps {
  dismiss: () => void;
  challenge: Challenge;
  isOpen: boolean;
  onReject?: () => void;
  onApprove?: () => void;
}

const ChallengeItemModal = ({
  dismiss,
  challenge,
  isOpen,
}: ChallengeItemModalProps) => {
  const [itemInfoIsOpen, setItemInfoIsOpen] = useState(true);
  const [showArrowDown, setShowArrowDown] = useState(false);
  const [infoHeight, setInfoHeight] = useState(0.25);
  const [title, setTitle] = useState("");
  const infoSheetModalRef = useRef<HTMLIonModalElement>(null);

  function handleDismiss() {
    setItemInfoIsOpen(false);
    dismiss();
  }

  function onInfoBreakpointDidChange(value: number) {
    setInfoHeight(value);
  }

  function reduceInfoHeigth() {
    infoSheetModalRef.current?.setCurrentBreakpoint(0.25);
  }
  useEffect(() => {
    if (challenge) {
      setTitle(challenge.name);
      setItemInfoIsOpen(true);
    }
  }, [challenge]);

  useEffect(() => {
    if (infoHeight > 0.25) {
      setShowArrowDown(true);
    } else {
      setShowArrowDown(false);
    }
  }, [infoHeight]);

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            {showArrowDown ? (
              <IonButton color="dark" onClick={reduceInfoHeigth}>
                <IonIcon icon={arrowDownOutline} />
              </IonButton>
            ) : (
              <IonButton color="dark" onClick={handleDismiss}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            )}
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid style={{ padding: "none" }}>
          <IonRow>
            <IonCol>
              <ImageLoader
                src={convertIpfsImageUrl(challenge?.imageUrl)}
                className=""
              />
            </IonCol>
          </IonRow>
        </IonGrid>
        <ChallengeItemInfoSheetModal
          challenge={challenge}
          isOpen={itemInfoIsOpen}
          ref={infoSheetModalRef}
          onBreakpointDidChange={onInfoBreakpointDidChange}
        />
      </IonContent>
    </IonModal>
  );
};

export default ChallengeItemModal;
