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
import {
  convertIpfsImageUrl,
  cutOffTooLongString,
  handleDisplayAddress,
} from "@/utils";
import useToast from "@/hooks/useToast";
import { banOutline } from "ionicons/icons";

import ContractService from "@/services/ContractService";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";

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
  const [pendingCreation, setPendingCreation] = useState(false);
  const [isDescriptionTouched, setIsDescriptionTouched] = useState(false);

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
  }, [pendingCreation]);

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
    setPendingCreation(true);
    const groupObject: GroupCreation = {
      createdBy: user?.id,
      name: createGroup.name,
      description: createGroup.description,
    };

    //TODO: clean this up after MVP
    try {
      const tokenContracts = allSelectedPools.map(
        (item) => item.mintingContractAddress
      );
      const honeyAddresses = allSelectedPools.map(
        (item) => item.honeyPotAddress
      );
      const createdContract = await ContractService.createCollective(
        tokenContracts,
        honeyAddresses
      );
      const { cWallet, cAddress, nonce, salt } = createdContract;
      console.log(createdContract, "CREATED CONTRACT FROM SDK");
      const result = await ApiService.createGroup({
        group: groupObject,
        pools: allSelectedPools,
      });
      console.log(result, "RESULT AFTER CREATING GROUP IN DB");
      if (result) {
        const updatedGroup = await ApiService.updateGroup(result.id, {
          group: {
            publicAddress: cAddress,
            walletAddress: cWallet,
            salt: salt,
            nonceKey: nonce?.toString(),
          },
          pools: [],
        });
        console.log(updatedGroup, "updated group IN DB?");
        if (!updatedGroup.ok) throw Error;
        const { name, id, createdBy } = result;
        setCreatedGroup({
          name: "",
          description: "",
        });
        setAllSelectedPools([]);
        setPendingCreation(false);
        router.push(
          `${pathConstants.mintPage.myCollectives}/?groupName=${name}&groupAddress=${cAddress}&groupId=${id}&createdBy=${createdBy}&activePools=${allSelectedPools.length}`
        );
      } else {
        throw Error;
      }
    } catch (error) {
      setPendingCreation(false);
      console.log(error, "wats error?");
      presentToast("We could not create your group :(", "danger", banOutline);
    }
  };

  return (
    <IonPage>
      <Header title="Create Collective" />
      {pendingCreation ? (
        <IonContent>
          <PageLoadingIndicator />
        </IonContent>
      ) : (
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

            <IonItem lines="none">
              <IonInput
                className={`${createGroup.description && "ion-valid"} ${
                  !createGroup.description && "ion-invalid"
                } ${isDescriptionTouched && "ion-touched"}`}
                onIonBlur={() => setIsDescriptionTouched(true)}
                errorText="Required field"
                clearInput={true}
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
                            {handleDisplayAddress(pool?.creatorOfMint || "")}
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
      )}
    </IonPage>
  );
};

export default CreateCollective;
