import { Challenge } from "@/types/challenges";
import {
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonLabel,
  IonModal,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import { ModalBreakpointChangeEventDetail } from "@ionic/core";
import { Ref, forwardRef, useEffect, useRef, useState } from "react";
import { convertDateToReadable, displayPrice, shortenAddress } from "@/utils";
import { closeOutline } from "ionicons/icons";
import ImageLoader from "../Images/ImageLoader";
import InfoSheetModalOverview from "./InfoSheetModalOverview";
import InfoSheetModalDetails from "./InfoSheetModalDetails";
import InfoSheetModalMintActivity from "./InfoSheetModalMintActivity";
import { useGetZoraSDKParams } from "@/hooks/useGetZoraSDKParams";

const ChallengeItemInfoSheetModal = (
  {
    challenge,
    onBreakpointDidChange,
    isOpen = true,
    initialBreakpoint = 0.35,
    onClickMint,
  }: {
    challenge: Challenge;
    isOpen: boolean;
    initialBreakpoint: number;
    onBreakpointDidChange?: (value: number) => void;
    onClickMint: () => void;
  },
  ref: Ref<HTMLIonModalElement>
) => {
  const [breakpoint, setBreakpoint] = useState(initialBreakpoint);
  const [modalClassName, setModalClassName] = useState("");
  const [activeInfoTab, setActiveInfoTab] = useState("details");
  const [fabBottom, setFabBottom] = useState("35%");

  const { params } = useGetZoraSDKParams(
    challenge.mintingContractAddress,
    challenge.chainId,
    1,
    challenge.tokenId ?? undefined
  );
  useEffect(() => {
    if (breakpoint > initialBreakpoint) {
      setModalClassName("expanded");
    } else {
      setModalClassName("");
    }
    if (breakpoint > 0.35) {
      setFabBottom("27%");
    } else if (breakpoint > 0.55) {
      setFabBottom("45%");
    } else {
      setFabBottom("68%");
    }
  }, [breakpoint]);

  const handleBreakpointChange = (
    e: CustomEvent<ModalBreakpointChangeEventDetail>
  ) => {
    const value = e?.detail?.breakpoint || initialBreakpoint;
    setBreakpoint(value);
    if (onBreakpointDidChange) {
      onBreakpointDidChange(value);
    }
  };

  const renderActiveContent = () => {
    switch (activeInfoTab) {
      case "overview":
        return <InfoSheetModalOverview challenge={challenge} />;
      case "details":
        return <InfoSheetModalDetails />;
      case "mintActivity":
        return <InfoSheetModalMintActivity challenge={challenge} />;
      default:
        return <InfoSheetModalOverview challenge={challenge} />;
    }
  };

  return (
    <IonModal
      id="sheet-info-modal"
      className={modalClassName}
      ref={ref}
      isOpen={isOpen}
      initialBreakpoint={initialBreakpoint}
      breakpoints={[initialBreakpoint, 0.35, 0.75, 0.85]}
      backdropDismiss={false}
      backdropBreakpoint={0.9}
      handleBehavior="cycle"
      onIonBreakpointDidChange={handleBreakpointChange}
    >
      <IonContent className="ion-padding">
        <IonGrid className="challenge-top-grid">
          <IonRow className="ion-justify-content-between ion-align-items-center">
            <IonCol size="9" className="challenge-info-title">
              {challenge.name}
            </IonCol>
            <IonCol size="3" className="challenge-info-amount">
              {challenge.floorPrice} ETH
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="9" className="challenge-info-creator">
              {shortenAddress(challenge.mintingContractAddress)}
            </IonCol>
            <IonCol size="3">
              <div className="challenge-time-chip">
                {convertDateToReadable(challenge.expiration)}
              </div>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-start ion-align-items-center challenge-info-item-details">
            <IonCol size="auto">
              <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>
              <IonLabel>{challenge.totalMints || 0}</IonLabel>
            </IonCol>
            <IonCol size="auto">
              <IonIcon src="/assets/icons/people-tile.svg"></IonIcon>
              <IonLabel>{challenge.groupcount || 0}</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonToolbar className="challenge-top-bar">
          <IonButtons slot="start">
            <IonButton
              className="challenge-top-tab-button"
              color={activeInfoTab === "details" ? "primary" : "dark"}
              onClick={() => setActiveInfoTab("details")}
            >
              Challenge Details
            </IonButton>
            <IonButton
              className="challenge-top-tab-button"
              color={activeInfoTab === "mintActivity" ? "primary" : "dark"}
              onClick={() => setActiveInfoTab("mintActivity")}
            >
              Mint Activity
            </IonButton>
          </IonButtons>
        </IonToolbar>
        {renderActiveContent()}
      </IonContent>
      <IonButton
        onClick={() => onClickMint()}
        className="challenge-mint-fab-button"
        color="primary"
        shape="round"
        style={{ bottom: fabBottom }}
      >
        Mint {displayPrice(challenge.floorPrice, params)} ETH
      </IonButton>
    </IonModal>
  );
};

export default forwardRef(ChallengeItemInfoSheetModal);
