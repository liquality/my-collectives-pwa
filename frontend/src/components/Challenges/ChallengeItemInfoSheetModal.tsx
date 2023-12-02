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
} from "@ionic/react";
import { ModalBreakpointChangeEventDetail } from "@ionic/core";
import { Ref, forwardRef, useEffect, useRef, useState } from "react";

const initialBreakpoint = 0.25;

const ChallengeItemInfoSheetModal = (
  {
    challenge,
    onBreakpointDidChange,
    isOpen = true,
  }: {
    challenge: Challenge;
    isOpen: boolean;
    onBreakpointDidChange?: (value: number) => void;
  },
  ref: Ref<HTMLIonModalElement>
) => {
  const [breakpoint, setBreakpoint] = useState(initialBreakpoint);
  const [modalClassName, setModalClassName] = useState("");
  useEffect(() => {
    if (breakpoint > initialBreakpoint) {
      setModalClassName("expanded");
    } else {
      setModalClassName("");
    }
  }, [breakpoint]);
  const handleBreakpointChange = (
    e: CustomEvent<ModalBreakpointChangeEventDetail>
  ) => {
    const value = e?.detail?.breakpoint || 0.25;
    setBreakpoint(value);
    if (onBreakpointDidChange) {
      onBreakpointDidChange(value);
    }
  };

  return (
    <IonModal
      id="sheet-info-modal"
      className={modalClassName}
      ref={ref}
      isOpen={isOpen}
      initialBreakpoint={initialBreakpoint}
      breakpoints={[0.25, 0.5, 0.75, 0.85]}
      backdropDismiss={false}
      backdropBreakpoint={0.9}
      handleBehavior="cycle"
      onIonBreakpointDidChange={handleBreakpointChange}
    >
      <IonContent className="ion-padding ion-border">
        <div className="test-container">
          <div className="test-content"> 
          The background image should be pleasantly blurred under this box.

This effect is difficult to achieve with a polyfill, particularly in the case where the backdrop moves or changes with respect to the dialog element.

Please try scrolling up/down in the image...

          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default forwardRef(ChallengeItemInfoSheetModal);
