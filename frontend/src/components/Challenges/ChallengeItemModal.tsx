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
  IonFab,
  IonFabButton,
  IonLabel,
} from "@ionic/react";
import { ModalBreakpointChangeEventDetail } from "@ionic/core";
import ChallengeItemInfoSheetModal from "./ChallengeItemInfoSheetModal";
import { Ref, forwardRef, useEffect, useRef, useState } from "react";
import { Challenge } from "@/types/challenges";
import { closeOutline, arrowDownOutline } from "ionicons/icons";
import { convertIpfsImageUrl } from "@/utils";
import ImageLoader from "../Images/ImageLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
export interface ChallengeItemModalProps {
  dismiss: () => void;
  challenges: Challenge[];
  currentChallengeId?: string;
  isOpen: boolean;
  onReject?: () => void;
  onMint?: () => void;
  presentingElement?: HTMLElement;
}

const initialInfoBreakpoint = 0.12;

const ChallengeItemModal = ({
  dismiss,
  currentChallengeId,
  isOpen,
  presentingElement,
  challenges,
  onReject,
  onMint,
}: ChallengeItemModalProps) => {
  const [itemInfoIsOpen, setItemInfoIsOpen] = useState(true);
  const [showArrowDown, setShowArrowDown] = useState(false);
  const [infoHeight, setInfoHeight] = useState(initialInfoBreakpoint);
  const [title, setTitle] = useState("");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const infoSheetModalRef = useRef<HTMLIonModalElement>(null);

  function handleDismiss() {
    setItemInfoIsOpen(false);
    dismiss();
  }

  function onInfoBreakpointDidChange(value: number) {
    setInfoHeight(value);
  }

  function handleReject() {
    onReject && onReject();
  }

  function handleMint() {
    onMint && onMint();
  }

  function reduceInfoHeigth() {
    infoSheetModalRef.current?.setCurrentBreakpoint(initialInfoBreakpoint);
  }

  useEffect(() => {
    if (currentChallengeId) {
      const index = challenges?.findIndex(
        (challenge) => challenge.id === currentChallengeId
      );
      if (index >= 0) {
        setChallenge(challenges[index]);
        setTitle(challenges[index].name);

        setItemInfoIsOpen(true);
      }
    }
  }, [currentChallengeId]);

  useEffect(() => {
    if (infoHeight > initialInfoBreakpoint) {
      setShowArrowDown(true);
    } else {
      setShowArrowDown(false);
    }
  }, [infoHeight]);

  return (
    <IonModal
      isOpen={isOpen}
      presentingElement={presentingElement!}
      className="challenge-item-modal"
    >
      <IonHeader className="ion-no-border">
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
        <IonGrid className="challenge-info-grid">
          <IonRow>
            <IonCol>
              {challenge ? (
                <ImageLoader
                  src={convertIpfsImageUrl(challenge?.imageUrl)}
                  className="challenge-info-img"
                />
              ) : null}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="challenge-item-actions">
              <IonButton color="danger" onClick={handleReject}>
                <IonIcon icon={closeOutline}></IonIcon>
              </IonButton>
              <IonButton color="primary" onClick={handleMint}>
                <IonIcon src="/assets/icons/mint-tile-white.svg"></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <ChallengeItemInfoSheetModal
          challenge={challenge!}
          initialBreakpoint={initialInfoBreakpoint}
          isOpen={itemInfoIsOpen}
          ref={infoSheetModalRef}
          onBreakpointDidChange={onInfoBreakpointDidChange}
        />
      </IonContent>
    </IonModal>
  );
};

export default ChallengeItemModal;
