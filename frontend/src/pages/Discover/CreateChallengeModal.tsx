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
  IonLabel,
  IonCol,
  IonRow,
} from "@ionic/react";
import ApiService from "@/services/ApiService";
import { Challenge } from "@/types/challenges";
import { closeOutline } from "ionicons/icons";
import { isAddress } from "viem";
import useToast from "@/hooks/useToast";
import { banOutline } from "ionicons/icons";

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
  const [validMintingContractAdress, setValidMintingContractAddress] =
    useState(false);
  const [validHoneyPotAddress, setValidHoneyPotAddress] = useState(false);
  const [error, setError] = useState("");
  const { presentToast } = useToast();

  const handleCreateChallenge = async () => {
    try {
      const result = await ApiService.createChallenges(createdChallenge);

      if (result?.id) {
        setResultChallenge(result);
        dismiss();
      } else {
        throw new Error();
      }
    } catch (error) {
      presentToast(
        "We could not fetch the necessary NFT info, please assure that you have entered the correct details",
        "danger",
        banOutline
      );
      console.log(error, "error posting group");
    }
  };

  const handleSetMintingContractAddress = (value: string) => {
    isAddress(value) === true
      ? setValidMintingContractAddress(true)
      : setValidMintingContractAddress(false);
    setCreatedChallenge((prevGroup) => ({
      ...prevGroup,
      mintingContractAddress: value,
    }));
  };

  const handleSetHoneyPotAddress = (value: string) => {
    isAddress(value) === true
      ? setValidHoneyPotAddress(true)
      : setValidHoneyPotAddress(false);
    setCreatedChallenge((prevGroup) => ({
      ...prevGroup,
      honeyPotAddress: value,
    }));
  };

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
                handleSetMintingContractAddress(e.detail.value!)
              }
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              label="Honey Pot Reward Contract Address"
              label-placement="floating"
              placeholder="Enter the address"
              onIonInput={(e) => handleSetHoneyPotAddress(e.detail.value!)}
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
          <IonItem className="mb-3">
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

          <IonItem>
            {error ? (
              <IonTitle style={{ color: "#EA0000" }}>{error}</IonTitle>
            ) : null}
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
