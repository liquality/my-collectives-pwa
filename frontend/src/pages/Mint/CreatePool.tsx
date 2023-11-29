import { useState } from "react";
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
  IonPage,
  useIonRouter,
} from "@ionic/react";
import ApiService from "@/services/ApiService";
import { GroupCreation } from "@/types/chat";
import { useAccount } from "wagmi";
import { RouteComponentProps, useHistory } from "react-router";
import Header from "@/components/Header";

export interface CreatePoolProps {
  presentingElement?: HTMLElement;
  dismiss?: () => void;
  onSuccess?: (groupId: number) => void;
  trigger: string;
}
//TODO: Make this a page, not a modal
const CreatePool: React.FC<RouteComponentProps> = ({ match }) => {
  const [groupName, setGroupName] = useState("");

  const [groupId, setGroupId] = useState<number | null>(null);
  const { address } = useAccount();
  const { goBack } = useIonRouter();

  const cancel = () => {
    goBack();
  };

  const [createGroup, setCreatedGroup] = useState({
    name: "",
    description: "",
  });

  return (
    <IonPage>
      <Header title="Create Collective" />

      <IonContent>
        <IonList inset={true}>
          <IonItem>
            <IonInput
              label="Collective Name"
              label-placement="floating"
              placeholder="Enter the name"
              onIonInput={(e) =>
                setCreatedGroup((prevGroup) => ({
                  ...prevGroup,
                  name: e.detail.value!,
                }))
              }
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              label="Description"
              label-placement="floating"
              placeholder="Enter the description"
              onIonInput={(e) =>
                setCreatedGroup((prevGroup) => ({
                  ...prevGroup,
                  description: e.detail.value!,
                }))
              }
            ></IonInput>
          </IonItem>
        </IonList>

        <IonList inset={true}>
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
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CreatePool;
