import { useState, forwardRef, Ref } from "react";
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
  IonText,
} from "@ionic/react";
import ApiService from "@/services/ApiService";
import { Challenge } from "@/types/challenges";
import { closeOutline, copyOutline } from "ionicons/icons";
import { isAddress } from "viem";
import useToast from "@/hooks/useToast";
import { banOutline } from "ionicons/icons";
import ContractService from "@/services/ContractService";
import { handleCopyClick, shortenAddress } from "@/utils";
import { create } from "domain";

export interface CreateChallengeModalProps {
  presentingElement?: HTMLElement;
  dismiss: () => void;
  onSuccess?: (groupId: number) => void;
  trigger: string;
  resultChallenge: Challenge | null;
  setResultChallenge: (challenge: Challenge) => void;
}
const CreateChallengeModal = forwardRef(function CreateChallengeModal(
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
    platform: "",
    network: "", // zora, arbitrum, polygon or base
    expiration: "",
    honeyPotAddress: "",
    salt: 0,
  });
  const [validAddresses, setValidAddresses] = useState({
    mintingContractAddress: false,
    honeyPotAddress: false,
  });

  const {
    mintingContractAddress,
    category,
    network,
    expiration,
    honeyPotAddress,
  } = createdChallenge;
  let isButtonDisabled =
    !mintingContractAddress ||
    !category ||
    !network ||
    !expiration ||
    !honeyPotAddress;
  const [validMintingContractAdress, setValidMintingContractAddress] =
    useState(false);
  const [validHoneyPotAddress, setValidHoneyPotAddress] = useState(false);
  const [error, setError] = useState("");
  const { presentToast } = useToast();
  const [isHoneyTouched, setIsHoneyTouched] = useState(false);
  const [isMintTouched, setIsMintTouched] = useState(false);

  const handleDismiss = async () => {
    setCreatedChallenge({
      mintingContractAddress: "",
      chainId: "",
      tokenId: "",
      category: "",
      platform: "",
      network: "",
      expiration: "",
      honeyPotAddress: "",
      salt: 0,
    });
    setValidAddresses({
      mintingContractAddress: false,
      honeyPotAddress: false,
    });
    dismiss();
  };

  const handleCreateChallenge = async () => {
    try {
      const result = await ApiService.createChallenges(createdChallenge);
      if (result?.id) {
        setResultChallenge(result);
        handleDismiss();
      } else {
        throw new Error();
      }
    } catch (error) {
      presentToast(
        "We could not fetch the necessary NFT info, please assure that you have entered the correct details",
        "danger",
        banOutline
      );
    }
  };

  const handleSetMintingContractAddress = (value: string) => {
    setValidAddresses((prevGroup) => ({
      ...prevGroup,
      mintingContractAddress: isAddress(value),
    }));
    setCreatedChallenge((prevGroup) => ({
      ...prevGroup,
      mintingContractAddress: value,
    }));
  };

  /*   const handleSetHoneyPotAddress = (value: string) => {
    setValidAddresses((prevGroup) => ({
      ...prevGroup,
      honeyPotAddress: isAddress(value),
    }));
    setCreatedChallenge((prevGroup) => ({
      ...prevGroup,
      honeyPotAddress: value,
    }));
  }; */

  const generateHoneyPot = async () => {
    const result = await ContractService.createHoneyPot();
    setCreatedChallenge((prevGroup) => ({
      ...prevGroup,
      honeyPotAddress: result.honeyPot,
      salt: result.salt,
    }));
  };

  const copy = () => {
    handleCopyClick(createdChallenge.honeyPotAddress);
    presentToast(
      `You copied the honey pot address! Use it for your mints.`,
      "primary",
      copyOutline
    );
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
          <IonButton color="dark" onClick={handleDismiss}>
            <IonIcon icon={closeOutline} />
          </IonButton>
        </IonButtons>
        <IonTitle>Create Challenge</IonTitle>
      </IonToolbar>
      <IonContent color="light">
        <IonList className="ion-padding" inset={true}>
          <IonItem lines="none">
            <IonInput
              className={`${
                validAddresses.mintingContractAddress && "ion-valid"
              } ${
                validAddresses.mintingContractAddress === false && "ion-invalid"
              } ${isMintTouched && "ion-touched"}`}
              onIonBlur={() => setIsMintTouched(true)}
              errorText="Invalid Address"
              clearInput={true}
              label="Minting Contract Address"
              label-placement="floating"
              placeholder="Enter the address"
              onIonChange={(e) =>
                handleSetMintingContractAddress(e.detail.value!)
              }
            >
              {" "}
            </IonInput>
          </IonItem>

          <IonItem lines="none">
            {/*   <IonInput
              className={`${validAddresses.honeyPotAddress && "ion-valid"} ${
                validAddresses.honeyPotAddress === false && "ion-invalid"
              } ${isHoneyTouched && "ion-touched"}`}
              onIonBlur={() => setIsHoneyTouched(true)}
              errorText="Invalid Address"
              clearInput={true}
              label="Honey Pot Reward Contract Address"
              label-placement="floating"
              placeholder="Enter the address"
              onIonChange={(e) => handleSetHoneyPotAddress(e.detail.value!)}
            ></IonInput> */}

            <IonButton
              onClick={() =>
                !createdChallenge.honeyPotAddress ? generateHoneyPot() : copy()
              }
              shape="round"
              /* disabled={!createdChallenge.mintingContractAddress} */
              /*    color={
                !createdChallenge.mintingContractAddress ? "medium" : "primary"
              } */
            >
              {!createdChallenge.honeyPotAddress
                ? "Generate HoneyPot"
                : shortenAddress(createdChallenge.honeyPotAddress)}
            </IonButton>
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
              <IonSelectOption value="goerli">Ethereum Goerli</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonSelect
              value={createdChallenge.platform}
              onIonChange={(e) =>
                setCreatedChallenge((prevGroup) => ({
                  ...prevGroup,
                  platform: e.detail.value!,
                }))
              }
              label="Platform"
              placeholder="Platform"
            >
              <IonSelectOption value="Local">Other</IonSelectOption>
              <IonSelectOption value="Sound">Sound</IonSelectOption>
              <IonSelectOption value="Zora">Zora</IonSelectOption>
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

export default CreateChallengeModal;
