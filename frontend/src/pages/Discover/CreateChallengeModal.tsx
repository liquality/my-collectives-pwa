import { useState, forwardRef, Ref } from "react";
import {
  IonItem,
  IonButton,
  IonContent,
  IonHeader,
  IonList,
  IonModal,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonFooter,
  useIonRouter,
} from "@ionic/react";
import ApiService from "@/services/ApiService";

import { useAccount } from "wagmi";

export interface CreateChallengeModalProps {
  presentingElement?: HTMLElement;
  dismiss?: () => void;
  onSuccess?: (groupId: number) => void;
  trigger: string;
}
//TODO: Make this a page, not a modal
const CreateGroupModal = forwardRef(function CreateGroupModal(
  { presentingElement, dismiss, onSuccess, trigger }: CreateChallengeModalProps,
  ref: Ref<HTMLIonModalElement>
) {
  const [createdChallenge, setCreatedChallenge] = useState({
    mintingContractAddress: "",
    chainId: "",
    tokenId: "", //can be left empty if tokenIds are unique (erc1155 vs erc721)
    category: "", //music, art or other
    platform: "", // zora, sound or prohobition
    expiration: "",
  });
  const [resultChallenge, setResultChallenge] = useState({}); //TODO: this should come in as props instead
  const { mintingContractAddress, chainId, category, platform, expiration } =
    createdChallenge;
  let isButtonDisabled =
    !mintingContractAddress ||
    !chainId ||
    !category ||
    !platform ||
    !expiration;

  console.log(isButtonDisabled, "buttn disabled?");
  const { address } = useAccount();

  const handleCreateChallenge = async () => {
    try {
      const result = await ApiService.createChallenges(createdChallenge);
      setResultChallenge(result);
      console.log(result, "SUCCESS result for insert");
      //onSuccess(result.id);
    } catch (error) {
      console.log(error, "error posting group");
    }
  };

  return (
    <IonModal
      initialBreakpoint={0.85}
      ref={ref}
      trigger={trigger}
      presentingElement={presentingElement!}
    >
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
              label="Chain Id"
              label-placement="floating"
              placeholder="Enter the chain id"
              onIonInput={(e) =>
                setCreatedChallenge((prevGroup) => ({
                  ...prevGroup,
                  chainId: e.detail.value!,
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
              <IonSelectOption value="type1">Art</IonSelectOption>
              <IonSelectOption value="type2">Music</IonSelectOption>
              <IonSelectOption value="type3">Other</IonSelectOption>
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
              <IonSelectOption value="type1">Zora</IonSelectOption>
              <IonSelectOption value="type2">Sound</IonSelectOption>
              <IonSelectOption value="type3">Prohobition</IonSelectOption>
            </IonSelect>
          </IonItem>

          {/* TODO: maybe make this a calender picker instead ? */}
          <IonItem>
            <IonInput
              label="Length (Days)"
              type="number"
              placeholder="Length (Days)"
              onIonChange={(e) =>
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
