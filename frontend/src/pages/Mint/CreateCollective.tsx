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
  IonText,
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
  const [allSelectedAndCurrentPools, setAllSelectedAndCurrentPools] = useState<
    Challenge[]
  >([]);
  const [pendingCreation, setPendingCreation] = useState(false);

  const { presentToast } = useToast();

  const page = useRef(undefined);
  const selectPoolModal = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  const [errorText, setErrorText] = useState("");

  const isButtonDisabled =
    !createGroup.description ||
    !createGroup.name ||
    !allSelectedAndCurrentPools.length;

  function hideSelectPoolModal() {
    selectPoolModal.current?.dismiss();
  }

  useEffect(() => {
    setPresentingElement(page.current);
  }, [pendingCreation]);

  const handlePoolSelection = (selectedPool: Challenge) => {
    if (allSelectedAndCurrentPools) {
      setAllSelectedAndCurrentPools((prevGroups) => [
        ...prevGroups,
        selectedPool,
      ]);
    }
    hideSelectPoolModal();
  };

  const cancel = () => {
    goBack();
  };

  const handleRemoval = (poolToRemove: Challenge) => {
    setAllSelectedAndCurrentPools((prevGroups) =>
      prevGroups?.filter((pool) => pool !== poolToRemove)
    );
  };

  console.log(allSelectedAndCurrentPools, "all selected pools");

  const handleErrorText = async () => {
    setErrorText("Name, description and at least 1 pool is required!");
    setTimeout(() => {
      setErrorText("");
    }, 5000);
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
      const tokenContracts = allSelectedAndCurrentPools.map(
        (item) => item.mintingContractAddress
      );
      const honeyAddresses = allSelectedAndCurrentPools.map(
        (item) => item.honeyPotAddress
      );

      const createdContract = await ContractService.createCollective(
        tokenContracts,
        honeyAddresses
      );

      const { cWallet, cAddress, nonce, salt } = createdContract;
      //TODO call this iteravly thorugh the tokencontracts/honeyaddresses
      //const poolAddress = ContractService.getPoolAddress(cAddress, cWallet, nonce,  )

      const allSelectedAndCurrentPoolsWithPoolAddress = await Promise.all(
        allSelectedAndCurrentPools.map(async (pool) => ({
          ...pool,
          publicAddress: await ContractService.getPoolAddress(
            cAddress,
            cWallet,
            nonce as bigint,
            pool.honeyPotAddress
          ),
        }))
      );

      console.log(
        allSelectedAndCurrentPoolsWithPoolAddress,
        "with pools allddress"
      );

      console.log("allSelectedAndCurrentPools = ", allSelectedAndCurrentPools);

      console.log(createdContract, "CREATED CONTRACT FROM SDK");
      const result = await ApiService.createGroup({
        group: groupObject,
        pools: allSelectedAndCurrentPoolsWithPoolAddress,
      });
      if (!result) throw Error("Trouble creating group in DB");
      const updatedGroup = await ApiService.updateGroup(result.id, {
        group: {
          publicAddress: cAddress,
          walletAddress: cWallet,
          salt: salt,
          nonceKey: nonce?.toString(),
        },
        pools: [],
      });
      if (!updatedGroup.ok) throw Error("Trouble updating group in DB");
      const { name, id, createdBy } = result;
      setCreatedGroup({
        name: "",
        description: "",
      });
      setAllSelectedAndCurrentPools([]);
      setPendingCreation(false);
      router.push(
        `${pathConstants.mintPage.myCollectives}/?groupName=${name}&groupAddress=${cAddress}&groupId=${id}&createdBy=${createdBy}&activePools=${allSelectedAndCurrentPools.length}`
      );
    } catch (error) {
      setPendingCreation(false);
      console.log(error, "wats error?");
      presentToast(
        "We could not create your group :( Reason: " + error,
        "danger",
        banOutline
      );
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
            selectedPools={allSelectedAndCurrentPools}
            handlePoolSelection={handlePoolSelection}
          />
          <IonList inset={true}>
            <IonItem>
              <IonInput
                onIonBlur={() => (isButtonDisabled ? handleErrorText() : null)}
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
                /*     className={`${createGroup.description && "ion-valid"} ${
                  !createGroup.description && "ion-invalid"
                } ${isDescriptionTouched && "ion-touched"}`}
                onIonBlur={() => setIsDescriptionTouched(true)}
                errorText="Required field"
                clearInput={true} */
                onIonBlur={() => (isButtonDisabled ? handleErrorText() : null)}
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
            <IonItem>
              <IonText color="danger">{errorText}</IonText>
            </IonItem>
          </IonList>

          <IonList inset={true}>
            {typeof allSelectedAndCurrentPools !== "undefined"
              ? allSelectedAndCurrentPools?.map((pool, index) => (
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
