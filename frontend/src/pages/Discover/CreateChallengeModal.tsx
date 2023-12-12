import { useState, forwardRef, Ref, useEffect } from "react";
import {
  IonItem,
  IonButton,
  IonContent,
  IonList,
  IonModal,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonTitle,
} from "@ionic/react";
import ApiService from "@/services/ApiService";
import { Challenge } from "@/types/challenges";
import { closeOutline } from "ionicons/icons";

export interface CreateChallengeModalProps {
  presentingElement?: HTMLElement;
  dismiss: () => void;
  onSuccess?: (groupId: number) => void;
  trigger: string;
  resultChallenge: Challenge | null;
  setResultChallenge: (challenge: Challenge) => void;
}
const CreateGroupModal = forwardRef(function CreateGroupModal(
  {
    presentingElement,
    dismiss,
    onSuccess,
    trigger,
    resultChallenge,
    setResultChallenge,
  }: CreateChallengeModalProps,
  ref: Ref<HTMLIonModalElement>
) {
  const [createdChallenge, setCreatedChallenge] = useState({
    mintingContractAddress: "",
    chainId: "",
    tokenId: "", //can be left empty if tokenIds are unique (erc1155 vs erc721)
    category: "", //music, art or other
    network: "", // zora, arbitrum, polygon or base
    expiration: "",
    honeyPotAddress: "",
  });
  const { mintingContractAddress, chainId, category, network, expiration } =
    createdChallenge;
  let isButtonDisabled =
    !mintingContractAddress || !category || !network || !expiration;

  const handleCreateChallenge = async () => {
    try {
      const result = await ApiService.createChallenges(createdChallenge);

      setResultChallenge(result);
      if (result.id) {
        dismiss();
      } else {
        //TODO: setError
      }
    } catch (error) {
      console.log(error, "error posting group");
    }
  };

  console.log(createdChallenge, "created challegne");
  return (
    <IonModal
      initialBreakpoint={0.95}
      ref={ref}
      trigger={trigger}
      presentingElement={presentingElement!}
    >
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton color="dark" onClick={() => dismiss()}>
            <IonIcon icon={closeOutline} />
          </IonButton>
        </IonButtons>
        <IonTitle>Create Challenge</IonTitle>
      </IonToolbar>
      <IonContent color="light">
        <IonList className="ion-padding" inset={true}>
          <IonItem>
            <IonInput
              label="Minting Contract Address"
              label-placement="floating"
              placeholder="Enter the address"
              onIonInput={(e) =>
                setCreatedChallenge((prevGroup) => ({
                  ...prevGroup,
                  mintingContractAddress: e.detail.value!,
                }))
              }
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              label="Honey Pot Reward Contract Address"
              label-placement="floating"
              placeholder="Enter the address"
              onIonInput={(e) =>
                setCreatedChallenge((prevGroup) => ({
                  ...prevGroup,
                  honeyPotAddress: e.detail.value!,
                }))
              }
            ></IonInput>
          </IonItem>

          {/* TODO: field is optional 
          If erc-721, tokenIds are unique and this shouldnt be filled in  
          if erc-1155 then this field has to be filled in
          */}
          <IonItem>
            <IonInput
              label="Token Id (if ERC-1155)"
              label-placement="floating"
              placeholder="Enter the token id (if ERC-1155)"
              onIonInput={(e) =>
                setCreatedChallenge((prevGroup) => ({
                  ...prevGroup,
                  tokenId: e.detail.value!,
                }))
              }
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonSelect
              value={createdChallenge.network}
              onIonChange={(e) =>
                setCreatedChallenge((prevGroup) => ({
                  ...prevGroup,
                  network: e.detail.value!,
                }))
              }
              label="Network"
              placeholder="Network"
            >
              <IonSelectOption value="zora">Zora</IonSelectOption>
              <IonSelectOption value="arbitrum">Arbitrum</IonSelectOption>
              <IonSelectOption value="optimism">Optimism</IonSelectOption>
              <IonSelectOption value="base">Base</IonSelectOption>
              <IonSelectOption value="polygon">Polygon</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonSelect
              value={createdChallenge.category} // Set the selected value
              onIonChange={(e) =>
                setCreatedChallenge((prevGroup) => ({
                  ...prevGroup,
                  category: e.detail.value!,
                }))
              }
              label="Category"
              placeholder="Category"
            >
              <IonSelectOption value="art">Art</IonSelectOption>
              <IonSelectOption value="music">Music</IonSelectOption>
              <IonSelectOption value="other">Other</IonSelectOption>
            </IonSelect>
          </IonItem>

          {/* TODO: maybe make this a calender picker instead ? */}
          <IonItem>
            <IonInput
              label="Length (Days)"
              type="number"
              placeholder="Length (Days)"
              onIonInput={(e) =>
                setCreatedChallenge((prevGroup) => ({
                  ...prevGroup,
                  expiration: e.detail.value!,
                }))
              }
            ></IonInput>
          </IonItem>
        </IonList>

        <div className="button-container">
          <IonButton
            onClick={handleCreateChallenge}
            shape="round"
            disabled={isButtonDisabled}
            color={isButtonDisabled ? "medium" : "primary"}
          >
            Create Challenge
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

export default CreateGroupModal;
