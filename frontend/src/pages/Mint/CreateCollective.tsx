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
  IonIcon,
} from "@ionic/react";
import ApiService from "@/services/ApiService";
import { GroupCreation } from "@/types/chat";
import { useAccount } from "wagmi";
import { RouteComponentProps, useHistory } from "react-router";
import Header from "@/components/Header";

export interface CreateCollectiveProps {
  presentingElement?: HTMLElement;
  dismiss?: () => void;
  onSuccess?: (groupId: number) => void;
  trigger: string;
}
//TODO: Make this a page, not a modal
const CreateCollective: React.FC<RouteComponentProps> = ({ match }) => {
  const [groupName, setGroupName] = useState("");

  const [groupId, setGroupId] = useState<number | null>(null);
  const { address } = useAccount();
  const history = useHistory();

  const cancel = () => {
    history.goBack();
  };

  const handleCreateGroup = async () => {
    const groupObject: GroupCreation = {
      name: groupName,
      publicAddress: "0x0232u326483848787ndas7298bda7289da", //TODO: hardcoded for now but will have to create the contract address from our factory
    };
    try {
      const result = await ApiService.createGroup(groupObject);
      setGroupId(result.id);
      //onSuccess(result.id);
    } catch (error) {
      console.log(error, "error posting group");
    }
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
          <IonItem></IonItem>
        </IonList>

        <IonList inset={true}>
          <div className="grey-container ">
            <div className="flexDirectionRow space-between">
              <p>POOL 1</p>
              <p onClick={() => console.log("Click edit")}>Edit</p>
            </div>
            <p>NFT NAME</p>
            <IonLabel>Details</IonLabel>
          </div>

          <div className="grey-container">
            <div className="flexDirectionRow space-between">
              <p>POOL 1</p>
              <p onClick={() => console.log("Click edit")}>Edit</p>
            </div>
            <p>NFT NAME</p>
            <IonLabel>Details</IonLabel>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CreateCollective;
