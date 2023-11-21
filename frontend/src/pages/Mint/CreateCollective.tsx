import { useEffect, useRef, useState } from "react";
import {
  IonItem,
  IonButton,
  IonContent,
  IonList,
  IonInput,
  IonLabel,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import ApiService from "@/services/ApiService";
import { GroupCreation } from "@/types/chat";
import { RouteComponentProps, useHistory } from "react-router";
import Header from "@/components/Header";
import { useSignInWallet } from "@/hooks/useSignInWallet";
import { routes } from "@/utils/routeNames";
import { Challenge } from "@/types/challenges";
import SelectPoolModal from "./SelectPoolModal";

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
  const [createGroup, setCreatedGroup] = useState({
    name: "",
    description: "",
  });

  const [selectedPool, setSelectedPool] = useState<Challenge | undefined>(
    undefined
  );
  const [allSelectedPools, setAllSelectedPools] = useState<
    Challenge[] | undefined
  >(undefined);
  const page = useRef(undefined);
  const createChallengeModal = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  function hideCreateChallengeModal() {
    createChallengeModal.current?.dismiss();
  }

  function handleCreateChallenge(groupId: number) {
    hideCreateChallengeModal();
  }

  useEffect(() => {
    // If a new pool has been selected and it's not null, push it into the existing pools array
    if (selectedPool !== null) {
      setAllSelectedPools((prevGroups: Challenge[] | undefined) => [
        ...(prevGroups || []),
        selectedPool as Challenge,
      ]);
    }
    setPresentingElement(page.current);
  }, [selectedPool]);

  const cancel = () => {
    goBack();
  };

  const handleCreateGroup = async () => {
    const groupObject: GroupCreation = {
      createdBy: user?.id,
      name: createGroup.name,
      description: createGroup.description,
      publicAddress: "0x0232u326483848787ndas7298bda7289da", //TODO: hardcoded for now but will have to create the contract address from our factory
    };
    try {
      const result = await ApiService.createGroup(groupObject);
      const { name, publicAddress, id, createdBy } = result;
      router.push(
        `${routes.mintPage.myCollectives}/?groupName=${name}&groupAddress=${publicAddress}&groupId=${id}&createdBy=${createdBy}`
      );
    } catch (error) {
      console.log(error, "error posting group");
    }
  };

  const isButtonDisabled = !createGroup.description || !createGroup.name;

  console.log(allSelectedPools, "all selected pools");
  return (
    <IonPage>
      <Header title="Create Collective" />

      <IonContent>
        <IonButton
          id="open-create-challenge-modal"
          color="primary"
          shape="round"
          expand="block"
        >
          Add Pool
        </IonButton>

        <SelectPoolModal
          trigger="open-create-challenge-modal"
          ref={createChallengeModal}
          presentingElement={presentingElement}
          dismiss={hideCreateChallengeModal}
          onSuccess={handleCreateChallenge}
          selectedPool={selectedPool}
          setSelectedPool={setSelectedPool}
        />
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
          {typeof allSelectedPools !== "undefined"
            ? allSelectedPools?.map((pool, index) => (
                <div className="grey-container" key={index}>
                  <div className="flexDirectionRow space-between">
                    <p>{`POOL ${index + 1}`}</p>
                    <p
                      className="small-purple-text"
                      onClick={() => console.log("Click remove")}
                    >
                      Remove
                    </p>
                  </div>
                  <p>NFT NAME: {pool?.name}</p>
                  <IonLabel>Details: {pool?.creatorOfMint}</IonLabel>
                </div>
              ))
            : null}

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
