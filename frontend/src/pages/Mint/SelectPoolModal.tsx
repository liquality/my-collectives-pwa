import { useState, forwardRef, Ref } from "react";
import { IonButton, IonContent, IonModal, IonLabel } from "@ionic/react";
import { Challenge } from "@/types/challenges";
import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import HorizontalSwipe from "@/components/Images/HorizontalSwipe";

export interface SelectPoolModal {
  presentingElement?: HTMLElement;
  dismiss: () => void;
  onSuccess?: (groupId: number) => void;
  trigger: string;
  selectedPool: Challenge | undefined;
  setSelectedPool: (challenge: Challenge | undefined) => void;
}
const SelectPoolModal = forwardRef(function CreateGroupModal(
  {
    presentingElement,
    dismiss,
    onSuccess,
    trigger,
    selectedPool,
    setSelectedPool,
  }: SelectPoolModal,
  ref: Ref<HTMLIonModalElement>
) {
  const { challenges, loading } = useGetChallenges();
  let isButtonDisabled = !selectedPool?.mintingContractAddress;

  const handleSelectPool = async () => {
    setSelectedPool(undefined);
    dismiss();
  };

  return (
    <IonModal
      initialBreakpoint={0.85}
      ref={ref}
      trigger={trigger}
      presentingElement={presentingElement!}
    >
      <IonContent className="ion-padding" color="light">
        <div className="spaced-on-sides">
          <IonLabel>Music | {challenges?.length}</IonLabel>
          <IonLabel color="primary">See All</IonLabel>
        </div>
        <div className="mb-3">
          {/* TODO: maybe refactor this to its own component specifically for SELECT
          as having optional Props is not the best */}
          <HorizontalSwipe
            imageData={challenges}
            loading={loading}
            selectedChallenge={selectedPool}
            setSelectedChallenge={setSelectedPool}
          ></HorizontalSwipe>
        </div>
        <div className="button-container">
          <IonButton
            onClick={handleSelectPool}
            shape="round"
            disabled={isButtonDisabled}
            color={isButtonDisabled ? "medium" : "primary"}
          >
            Select Pool
          </IonButton>
          <IonButton
            onClick={dismiss}
            shape="round"
            fill="clear"
            color="primary"
          >
            Cancel
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
});

export default SelectPoolModal;
