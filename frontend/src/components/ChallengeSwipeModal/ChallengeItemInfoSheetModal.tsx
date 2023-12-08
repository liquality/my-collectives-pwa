import { Challenge } from "@/types/challenges";
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
  IonAvatar,
  IonImg,
  IonLabel,
  IonList,
  IonSearchbar,
  IonModal,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import { ModalBreakpointChangeEventDetail } from "@ionic/core";
import { Ref, forwardRef, useEffect, useRef, useState } from "react";
import { convertIpfsImageUrl, shortenAddress } from "@/utils";
import { closeOutline } from "ionicons/icons";
import ImageLoader from "../Images/ImageLoader";
import InfoSheetModalOverview from "./InfoSheetModalOverview";
import InfoSheetModalDetails from "./InfoSheetModalDetails";
import InfoSheetModalMintActivity from "./InfoSheetModalMintActivity";

const ChallengeItemInfoSheetModal = (
  {
    challenge,
    onBreakpointDidChange,
    isOpen = true,
    initialBreakpoint = 0.12,
  }: {
    challenge: Challenge;
    isOpen: boolean;
    initialBreakpoint: number;
    onBreakpointDidChange?: (value: number) => void;
  },
  ref: Ref<HTMLIonModalElement>
) => {
  const [breakpoint, setBreakpoint] = useState(initialBreakpoint);
  const [modalClassName, setModalClassName] = useState("");
  const [activeInfoTab, setActiveInfoTab] = useState("overview");
  const [fabBottom, setFabBottom] = useState("35%");
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
        return <InfoSheetModalOverview />;
      case "details":
        return <InfoSheetModalDetails />;
      case "mintActivity":
        return <InfoSheetModalMintActivity challenge={challenge} />;
      default:
        return <InfoSheetModalOverview />;
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
              0.002 ETH
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="9" className="challenge-info-creator">
              {shortenAddress(challenge.mintingContractAddress)}
            </IonCol>
            <IonCol size="3" className=""></IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-start ion-align-items-center challenge-info-item-details">
            <IonCol size="auto">
              <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>
              <IonLabel>80</IonLabel>
            </IonCol>
            <IonCol size="auto">
              <IonIcon src="/assets/icons/people-tile.svg"></IonIcon>
              <IonLabel>80</IonLabel>
            </IonCol>
            <IonCol size="auto">
              <IonIcon src="/assets/icons/message-tile.svg"></IonIcon>
              <IonLabel>4</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonToolbar className="challenge-top-bar">
          <IonButtons slot="start">
            <IonButton
              className="challenge-top-tab-button"
              color={activeInfoTab === "overview" ? "primary" : "dark"}
              onClick={() => setActiveInfoTab("overview")}
            >
              Overview
            </IonButton>
            <IonButton
              className="challenge-top-tab-button"
              color={activeInfoTab === "details" ? "primary" : "dark"}
              onClick={() => setActiveInfoTab("details")}
            >
              Details
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
        <IonContent className="">{renderActiveContent()}</IonContent>
      </IonContent>
      <IonButton
        className="challenge-mint-fab-button"
        color="primary"
        shape="round"
        style={{ bottom: fabBottom }}
      >
        Mint 0.00 ETH
      </IonButton>
    </IonModal>
  );
};

export default forwardRef(ChallengeItemInfoSheetModal);
