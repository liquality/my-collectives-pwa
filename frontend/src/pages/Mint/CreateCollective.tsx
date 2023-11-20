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
  useIonRouter,
} from "@ionic/react";
import ApiService from "@/services/ApiService";
import { GroupCreation } from "@/types/chat";
import { useAccount } from "wagmi";
import { RouteComponentProps, useHistory } from "react-router";
import Header from "@/components/Header";
import { useSignInWallet } from "@/hooks/useSignInWallet";
import { routes } from "@/utils/routeNames";

export interface CreateCollectiveProps {
  presentingElement?: HTMLElement;
  dismiss?: () => void;
  onSuccess?: (groupId: number) => void;
  trigger: string;
}
//TODO: Make this a page, not a modal
const CreateCollective: React.FC<RouteComponentProps> = ({ match }) => {
  const { goBack } = useIonRouter();
  const { user } = useSignInWallet();
  const router = useIonRouter();
  console.log(user?.id, "wats user?");

  const cancel = () => {
    goBack();
  };

  const handleCreateGroup = async () => {
    console.log(user, "user when click?");
    const groupObject: GroupCreation = {
      createdBy: user?.id,
      name: createGroup.name,
      description: createGroup.description,
      publicAddress: "0x0232u326483848787ndas7298bda7289da", //TODO: hardcoded for now but will have to create the contract address from our factory
    };

    console.log(user?.id, "USER IDD*ÄÄÄÄ");
    try {
      const result = await ApiService.createGroup(groupObject);
      const { name, publicAddress, id, createdBy } = result;
      router.push(
        `${routes.mintPage.myCollectives}/?groupName=${name}&groupAddress=${publicAddress}&groupId=${id}&createdBy=${createdBy}`
      );
      //setGroupId(result, '');
      console.log(result, "wats reeees?");
      //onSuccess(result.id);
    } catch (error) {
      console.log(error, "error posting group");
    }
  };

  const [createGroup, setCreatedGroup] = useState({
    name: "",
    description: "",
  });

  const isButtonDisabled = !createGroup.description || !createGroup.name;
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
              <p
                className="small-purple-text "
                onClick={() => console.log("Click edit")}
              >
                Edit
              </p>
            </div>
            <p>NFT NAME</p>
            <IonLabel>Details</IonLabel>
          </div>

          <div className="grey-container">
            <div className="flexDirectionRow space-between">
              <p>POOL 2</p>
              <p
                className="small-purple-text "
                onClick={() => console.log("Click edit")}
              >
                Edit
              </p>
            </div>
            <p>NFT NAME</p>
            <IonLabel>Details</IonLabel>
          </div>
          <p className="small-purple-text align-to-grey-container">
            + Add Pool
          </p>
        </IonList>

        <div className="button-container">
          <IonButton
            onClick={handleCreateGroup}
            shape="round"
            disabled={isButtonDisabled}
            color={isButtonDisabled ? "medium" : "primary"}
          >
            Create Collective
          </IonButton>
          <IonButton
            onClick={cancel}
            shape="round"
            fill="clear"
            color="primary"
          >
            Cancel
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreateCollective;
