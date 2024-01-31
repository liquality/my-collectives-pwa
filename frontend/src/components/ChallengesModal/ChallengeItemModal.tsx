import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonIcon,
  IonModal,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import ChallengeItemInfoSheetModal from "./ChallengeItemInfoSheetModal";
import { useEffect, useRef, useState } from "react";
import { Challenge } from "@/types/challenges";
import { closeOutline, arrowDownOutline } from "ionicons/icons";
import { convertIpfsImageUrl } from "@/utils";
import ChallengeImageCard from "./ChallengeImageCard";
import { AnimatePresence, motion } from "framer";
import ChallengeItemMintModal from "./ChallengeItemMintModal";
export interface ChallengeItemModalProps {
  dismiss: () => void;
  challenges: Challenge[];
  selectedChallengeId?: string;
  isOpen: boolean;
  presentingElement?: HTMLElement;
}

const initialInfoBreakpoint = 0.25;
type CardSwipeDirection = "left" | "right";

export const easeOutExpo = [0.16, 1, 0.3, 1];

const cardVariants = {
  current: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0 },
  },
  exit: {
    opacity: 0,
    x: -300,
    y: 40,
    rotate: -20,
    transition: { duration: 0.3, ease: easeOutExpo },
  },
};

const ChallengeItemModal = ({
  dismiss,
  selectedChallengeId,
  isOpen,
  presentingElement,
  challenges,
}: ChallengeItemModalProps) => {
  const [itemInfoIsOpen, setItemInfoIsOpen] = useState(true);
  const [mintModalIsOpen, setMintModalIsOpen] = useState(false);
  const [showArrowDown, setShowArrowDown] = useState(false);
  const [infoHeight, setInfoHeight] = useState(initialInfoBreakpoint);
  const [nextIndex, setNextIndex] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [applyRejectAnimation, setApplyRejectAnimation] = useState(false);
  const [disableNav, setDisableNav] = useState(false);
  const infoSheetModalRef = useRef<HTMLIonModalElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleDismiss() {
    setItemInfoIsOpen(false);
    setMintModalIsOpen(false);
    dismiss();
  }

  function onInfoBreakpointDidChange(value: number) {
    setInfoHeight(value);
  }

  function onClickMint() {
    setItemInfoIsOpen(false);
    setMintModalIsOpen(true);
  }

  function onDismissMintModal() {
    setMintModalIsOpen(false);
    setItemInfoIsOpen(true);
    setInfoHeight(initialInfoBreakpoint);
  }

  function onClickReject() {
    setApplyRejectAnimation(true);
    setCurrentCard();
    setTimeout(() => {
      setApplyRejectAnimation(false);
    }, 300);
  }

  function handleCardSwipe(direction: string) {
    if ((direction as CardSwipeDirection) === "left") {
      setCurrentCard();
    } else {
      onClickMint();
    }
  }

  function reduceInfoHeigth() {
    infoSheetModalRef.current?.setCurrentBreakpoint(initialInfoBreakpoint);
    setInfoHeight(initialInfoBreakpoint);
  }

  function setCurrentCard(index: number = -1) {
    if (index >= 0) {
      setCurrentIndex(index);
      if (index + 1 >= challenges.length - 1) {
        setNextIndex(0);
      } else {
        setNextIndex(index + 1);
      }
    } else {
      if (currentIndex < challenges.length - 1) {
        const _currentIndex = currentIndex + 1;
        setCurrentIndex(_currentIndex);
        if (_currentIndex + 1 >= challenges.length - 1) {
          setNextIndex(0);
        } else {
          setNextIndex(_currentIndex + 1);
        }
      } else {
        setCurrentIndex(0);
        setNextIndex(1);
      }
    }
  }

  useEffect(() => {
    if (selectedChallengeId) {
      const index = challenges.findIndex(
        (challenge) =>
          challenge?.id === selectedChallengeId ||
          challenge?.challengeId === selectedChallengeId
      );

      if (index >= 0) {
        setCurrentCard(index);
        setItemInfoIsOpen(true);
      }
    }
  }, [selectedChallengeId]);

  useEffect(() => {
    if (challenges.length <= 1) {
      setDisableNav(true);
    } else {
      setDisableNav(false);
    }
  }, [challenges]);

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
      onIonModalDidDismiss={() => handleDismiss()}
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
          <IonTitle>
            {challenges[currentIndex]?.totalMints} |{" "}
            {challenges[currentIndex]?.groupcount} Groups
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className="challenge-info-grid">
          <IonRow>
            <IonCol className="challenge-info-cards">
              {disableNav ? null : (
                <AnimatePresence>
                  <motion.div
                    variants={cardVariants}
                    animate={
                      !disableNav && applyRejectAnimation ? "" : "current"
                    }
                  >
                    <ChallengeImageCard
                      disableNav={disableNav}
                      onSwipe={handleCardSwipe}
                      url={convertIpfsImageUrl(
                        challenges[nextIndex]?.imageUrl || ""
                      )}
                      setIsDragging={setIsDragging}
                      isDragging={isDragging}
                    />
                  </motion.div>
                </AnimatePresence>
              )}
              <AnimatePresence>
                <motion.div
                  variants={cardVariants}
                  animate={!disableNav && applyRejectAnimation ? "exit" : ""}
                >
                  <ChallengeImageCard
                    disableNav={disableNav}
                    onSwipe={handleCardSwipe}
                    url={convertIpfsImageUrl(
                      challenges[currentIndex]?.imageUrl || ""
                    )}
                    setIsDragging={setIsDragging}
                    isDragging={isDragging}
                  />
                </motion.div>
              </AnimatePresence>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="challenge-item-actions">
              <IonButton
                disabled={disableNav}
                color="danger"
                onClick={onClickReject}
              >
                <IonIcon icon={closeOutline}></IonIcon>
              </IonButton>
              <IonButton color="primary" onClick={onClickMint}>
                <IonIcon src="/assets/icons/mint-tile-white.svg"></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        {challenges[currentIndex] ? (
          <>
            <ChallengeItemInfoSheetModal
              challenge={challenges[currentIndex]}
              initialBreakpoint={initialInfoBreakpoint}
              isOpen={itemInfoIsOpen}
              ref={infoSheetModalRef}
              onBreakpointDidChange={onInfoBreakpointDidChange}
              onClickMint={onClickMint}
            />
            <ChallengeItemMintModal
              challenge={challenges[currentIndex]}
              isOpen={mintModalIsOpen}
              dismiss={onDismissMintModal}
            />
          </>
        ) : null}
      </IonContent>
    </IonModal>
  );
};

export default ChallengeItemModal;
