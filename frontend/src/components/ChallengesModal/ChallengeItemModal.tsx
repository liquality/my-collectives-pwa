import "swiper/css/effect-cards";
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
import { useEffect, useMemo, useRef, useState } from "react";
import { Challenge } from "@/types/challenges";
import { closeOutline, arrowDownOutline } from "ionicons/icons";
import { convertIpfsImageUrl } from "@/utils";
import ChallengeItemMintModal from "./ChallengeItemMintModal";
import ImageLoader from "../Images/ImageLoader";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { PageLoadingIndicator } from "../PageLoadingIndicator";

export interface ChallengeItemModalProps {
  dismiss: () => void;
  challenges: Challenge[];
  selectedChallengeId?: string;
  isOpen: boolean;
  presentingElement?: HTMLElement;
}
const initialInfoBreakpoint = 0.25;

const ChallengeItemModal = ({
  dismiss,
  selectedChallengeId,
  isOpen,
  presentingElement,
  challenges,
}: ChallengeItemModalProps) => {
  const [itemInfoIsOpen, setItemInfoIsOpen] = useState(true);
  const [mintModalIsOpen, setMintModalIsOpen] = useState(false);
  const [showSwiper, setShowSwiper] = useState(false);
  const [infoHeight, setInfoHeight] = useState(initialInfoBreakpoint);
  const infoSheetModalRef = useRef<HTMLIonModalElement>(null);
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);

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

  function onClickReject() {
    swiperRef?.slideNext();
  }

  function onDismissMintModal() {
    setItemInfoIsOpen(true);
    setMintModalIsOpen(false);
  }

  function handleOnSwiper(swiper: SwiperClass) {
    setSwiperRef(swiper);
  }

  function handleActiveIndexChange(swiper: SwiperClass) {
    setActiveChallengeIndex(swiper.realIndex);
  }

  function reduceInfoHeigth() {
    infoSheetModalRef.current?.setCurrentBreakpoint(initialInfoBreakpoint);
  }

  useEffect(() => {
    if (selectedChallengeId && swiperRef && !swiperRef.destroyed) {
      const index = challenges.findIndex(
        (challenge) =>
          challenge?.id === selectedChallengeId ||
          challenge?.challengeId === selectedChallengeId
      );
      if (index >= 0) {
        setActiveChallengeIndex(index);
        setItemInfoIsOpen(true);
        swiperRef.slideTo(index, 0);
        swiperRef.on("realIndexChange", handleActiveIndexChange);
        setShowSwiper(true);
      }
    } else {
      setShowSwiper(false);
    }
  }, [selectedChallengeId, swiperRef]);

  const disableNav = useMemo(() => challenges.length <= 1, [challenges]);

  const showArrowDown = useMemo(
    () => infoHeight > initialInfoBreakpoint,
    [infoHeight]
  );

  return (
    <IonModal
      isOpen={isOpen}
      onIonModalDidDismiss={handleDismiss}
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
            {swiperRef && (
              <>
                {challenges[activeChallengeIndex].totalMints} |{" "}
                {challenges[activeChallengeIndex].groupcount} Groups
              </>
            )}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className="challenge-info-grid">
          <IonRow>
            <IonCol className="challenge-info-cards">
              {!showSwiper && <PageLoadingIndicator />}

              <Swiper
                onSwiper={handleOnSwiper}
                effect={"cards"}
                grabCursor={true}
                slidesPerView={1}
                loop={true}
                modules={[EffectCards]}
                className="challenge-cards-swiper"
              >
                {challenges.map((challenge: any, index: number) => (
                  <SwiperSlide key={index}>
                    <ImageLoader
                      src={convertIpfsImageUrl(challenge.imageUrl || "")}
                      className="challenge-info-img"
                    />
                    ;
                  </SwiperSlide>
                ))}
              </Swiper>
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
        {challenges[activeChallengeIndex] && (
          <ChallengeItemInfoSheetModal
            challenge={challenges[activeChallengeIndex]}
            initialBreakpoint={initialInfoBreakpoint}
            isOpen={itemInfoIsOpen}
            ref={infoSheetModalRef}
            onBreakpointDidChange={onInfoBreakpointDidChange}
            onClickMint={onClickMint}
          />
        )}

        {mintModalIsOpen && challenges[activeChallengeIndex] && (
          <>
            <ChallengeItemMintModal
              challenge={challenges[activeChallengeIndex]}
              dismiss={onDismissMintModal}
            />
          </>
        )}
      </IonContent>
    </IonModal>
  );
};

export default ChallengeItemModal;
