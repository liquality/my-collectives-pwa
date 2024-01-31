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
import { useEffect, useRef, useState } from "react";
import { Challenge } from "@/types/challenges";
import { closeOutline, arrowDownOutline } from "ionicons/icons";
import { convertIpfsImageUrl } from "@/utils";
import ChallengeItemMintModal from "./ChallengeItemMintModal";
import ImageLoader from "../Images/ImageLoader";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

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
  const [showArrowDown, setShowArrowDown] = useState(false);
  const [infoHeight, setInfoHeight] = useState(initialInfoBreakpoint);
  const [disableNav, setDisableNav] = useState(false);
  const infoSheetModalRef = useRef<HTMLIonModalElement>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

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
  }

  function onClickReject() {
    swiperRef?.slideNext();
  }

  function handleOnSwiper(swiper: SwiperClass) {
    swiper.slideTo(currentIndex, 0, false);
    setSwiperRef(swiper);
  }

  function handleActiveIndexChange(swiper: SwiperClass) {
    if (currentIndex !== swiper.realIndex) {
      console.log(
        "handleActiveIndexChange",
        currentIndex,
        swiper.realIndex,
        swiper.swipeDirection
      );

      if (swiper.swipeDirection === "prev") {
        onClickMint();
        swiper.slideTo(currentIndex, 0, false);
      } else {
        setCurrentIndex(swiper.realIndex);
      }
    }
  }

  function reduceInfoHeigth() {
    infoSheetModalRef.current?.setCurrentBreakpoint(initialInfoBreakpoint);
  }

  useEffect(() => {
    if (selectedChallengeId) {
      const index = challenges.findIndex(
        (challenge) =>
          challenge?.id === selectedChallengeId ||
          challenge?.challengeId === selectedChallengeId
      );
      if (index >= 0) {
        setCurrentIndex(index);
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
            {challenges[currentIndex]?.totalMints} |{" "}
            {challenges[currentIndex]?.groupcount} Groups
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className="challenge-info-grid">
          <IonRow>
            <IonCol className="challenge-info-cards">
              <Swiper
                onSwiper={handleOnSwiper}
                onRealIndexChange={handleActiveIndexChange}
                effect={"cards"}
                grabCursor={true}
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                navigation={true}
                modules={[EffectCards]}
                className="challenge-cards-swiper"
              >
                {disableNav || !swiperRef
                  ? null
                  : challenges.map((challenge: any, index: number) => (
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
