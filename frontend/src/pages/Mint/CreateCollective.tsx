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
import { GroupCreation } from "@/types/general-types";
import { RouteComponentProps } from "react-router";
import Header from "@/components/Header";
import { useSignInWallet } from "@/hooks/useSignInWallet";
import { pathConstants } from "@/utils/routeNames";
import { Challenge } from "@/types/challenges";
import SelectPoolModal from "./SelectPoolModal";
import { convertIpfsImageUrl, cutOffTooLongString } from "@/utils";
import useToast from "@/hooks/useToast";
import { banOutline } from "ionicons/icons";

export interface CreateCollectiveProps {
  presentingElement?: HTMLElement;
  dismiss?: () => void;
  onSuccess?: (groupId: number) => void;
  trigger: string;
}
const CreateCollective: React.FC<RouteComponentProps> = ({ match }) => {
  const { goBack } = useIonRouter();
  const { user } = useSignInWallet();
  const router = useIonRouter();
  const [createGroup, setCreatedGroup] = useState({
    name: "",
    description: "",
  });
  const [allSelectedPools, setAllSelectedPools] = useState<Challenge[]>([]);
  const { presentToast } = useToast();

  const page = useRef(undefined);
  const selectPoolModal = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);
  const isButtonDisabled = !createGroup.description || !createGroup.name;

  function hideSelectPoolModal() {
    selectPoolModal.current?.dismiss();
  }

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const handlePoolSelection = (selectedPool: Challenge) => {
    if (allSelectedPools) {
      setAllSelectedPools((prevGroups) => [...prevGroups, selectedPool]);
    }
    hideSelectPoolModal();
  };

  const cancel = () => {
    goBack();
  };

  const handleRemoval = (poolToRemove: Challenge) => {
    setAllSelectedPools((prevGroups) =>
      prevGroups?.filter((pool) => pool !== poolToRemove)
    );
  };

  const handleCreateGroup = async () => {
    const groupObject: GroupCreation = {
      createdBy: user?.id,
      name: createGroup.name,
      description: createGroup.description,
      publicAddress: Math.floor(Math.random() * 100).toString(), //TODO: hardcoded for now but will have to create the contract address from our factory
    };
    try {
      const result = await ApiService.createGroup({
        group: groupObject,
        pools: allSelectedPools,
      });
      //TODO: in the backend or frontend, when a POOL is created, need to call createPool() from smart contract, which returns
      //the unique public address of that pool
      const { name, publicAddress, id, createdBy } = result;
      router.push(
        `${pathConstants.mintPage.myCollectives}/?groupName=${name}&groupAddress=${publicAddress}&groupId=${id}&createdBy=${createdBy}`
      );
    } catch (error) {
      presentToast("We could not create your group :(", "danger", banOutline);
      console.log(error, "error posting group");
    }
  };

  return (
    <IonPage>
      <Header title="Create Collective" />

      <IonContent>
        <SelectPoolModal
          trigger="open-add-pool-modal"
          ref={selectPoolModal}
          presentingElement={presentingElement}
          dismiss={hideSelectPoolModal}
          selectedPools={allSelectedPools}
          handlePoolSelection={handlePoolSelection}
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
                    <div className="flexDirectionRow">
                      <img
                        className="row-img"
                        alt="group-avatar"
                        src={convertIpfsImageUrl(pool.imageUrl)}
                      />
                      <div className="ml-1">
                        <p> {cutOffTooLongString(pool?.name, 20)}</p>
                        <p className="creator-of-mint">
                          {pool?.creatorOfMint ?? "creator.eth"}
                        </p>
                      </div>
                    </div>
                    <p
                      className="small-purple-text"
                      onClick={() => handleRemoval(pool)}
                    >
                      Remove
                    </p>
                  </div>
                </div>
              ))
            : null}

          <IonButton
            id="open-add-pool-modal"
            fill="clear"
            color="primary"
            expand="block"
          >
            + Add Pool
          </IonButton>
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
