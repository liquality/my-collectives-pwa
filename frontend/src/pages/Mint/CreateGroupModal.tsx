import { useState, forwardRef, Ref } from "react";
import {
  IonItem,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
  IonInput,
  IonTextarea,
  IonLabel,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonFooter,
  useIonRouter,
} from "@ionic/react";
import ApiService from "@/services/ApiService";
import { GroupCreation } from "@/types/chat";
import { useAccount } from "wagmi";

export interface CreateGroupModalProps {
  presentingElement?: HTMLElement;
  dismiss: () => void;
  onSuccess: (groupId: number) => void;
  trigger: string;
}

const CreateGroupModal = forwardRef(function CreateGroupModal(
  { presentingElement, dismiss, onSuccess, trigger }: CreateGroupModalProps,
  ref: Ref<HTMLIonModalElement>
) {
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState<number | null>(null);

  const { address } = useAccount();

  const handleCreateGroup = async () => {
    const groupObject: GroupCreation = {
      group_name: groupName,
      public_address: "0x0232u326483848787ndas7298bda7289da", //TODO: hardcoded for now but will have to create the contract address from our factory
    };
    try {
      const result = await ApiService.createGroup(groupObject);
      setGroupId(result.id);
      await ApiService.createMember({
        group_id: result.id,
        sender: address,
      });
      onSuccess(result.id);
    } catch (error) {
      console.log(error, "error posting group");
    }
  };
  
  return (
    <IonModal
      ref={ref}
      trigger={trigger}
      presentingElement={presentingElement!}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create New Group</IonTitle>
          <IonButtons slot="start" className="ion-hide-md-up">
            <IonButton color="secondary" onClick={dismiss}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonButtons slot="end" className="ion-hide-md-up">
            <IonButton onClick={handleCreateGroup}>Create</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <IonList className="ion-padding" inset={true}>
          <IonItem>
            <IonInput
              label="Name"
              label-placement="floating"
              placeholder="Enter the name"
              onIonInput={(e) => setGroupName(e.detail.value!)} 
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonTextarea
              label="Description"
              label-placement="floating"
              placeholder="Enter the description"
            ></IonTextarea>
          </IonItem>
        </IonList>

        <IonList className="ion-padding" inset={true}>
          <IonListHeader>
            <IonLabel>First Pool</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonInput
              label="Chain Id"
              label-placement="floating"
              placeholder="Enter the chain id"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              label="Platform Url"
              label-placement="floating"
              placeholder="Enter the Platform Url"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              label="Token Id"
              label-placement="floating"
              placeholder="Enter the Token Id"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              label="Minting Contract Address"
              label-placement="floating"
              placeholder="Enter the Minting Contract Address"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonSelect label="Type of Pool" placeholder="Type of Pool">
              <IonSelectOption value="type1">Type 1</IonSelectOption>
              <IonSelectOption value="type2">Type 2</IonSelectOption>
              <IonSelectOption value="type3">Type 3</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonInput
              label="Length (Days)"
              type="number"
              placeholder="Length (Days)"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonTextarea
              label="Terms"
              label-placement="floating"
              placeholder="Enter the Terms"
            ></IonTextarea>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter className="ion-hide ion-show-md-up">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton
              className="footer-button"
              onClick={dismiss}
              shape="round"
              fill="outline"
            >
              Cancel
            </IonButton>
            <IonButton
              className="footer-button"
              onClick={handleCreateGroup}
              shape="round"
              fill="solid"
            >
              Create Pool
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
});

export default CreateGroupModal;
