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
import { RouteComponentProps, useParams } from "react-router";
import Header from "@/components/Header";
import { Challenge } from "@/types/challenges";
import SelectPoolModal from "../Mint/SelectPoolModal";
import useGetChallengesByGroupId from "@/hooks/Collective/useGetChallengesByGroupId";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";
import {
  convertIpfsImageUrl,
  cutOffTooLongString,
  handleDisplayAddress,
} from "@/utils";
import ApiService from "@/services/ApiService";
import ContractService from "@/services/ContractService";

export interface CreateCollectiveProps {
  presentingElement?: HTMLElement;
  dismiss?: () => void;
  onSuccess?: (groupId: number) => void;
  trigger: string;
}

export interface ManageCollectivePageProps
  extends RouteComponentProps<{
    groupId?: string;
  }> {}

const ManageCollective: React.FC<ManageCollectivePageProps> = () => {
  const { goBack } = useIonRouter();
  const { groupId } = useParams<{ groupId: string }>();
  const { pools } = useGetChallengesByGroupId(groupId);
  const { group } = useGetGroupById(groupId);
  const [updatedGroup, setUpdatedGroup] = useState({
    name: "",
    description: "",
  });
  const [allSelectedPools, setAllSelectedPools] = useState<Challenge[]>([]);
  const [updatingGroup, setUpdatingGBroup] = useState(false);
  const selectPoolModal = useRef<HTMLIonModalElement>(null);
  const isButtonDisabled = !updatedGroup.description || !updatedGroup.name;
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);
  const page = useRef(undefined);

  useEffect(() => {
    if (pools && !allSelectedPools.length) {
      setAllSelectedPools(pools);
    }
    if (group) {
      setUpdatedGroup({
        name: group.name,
        description: group.description,
      });
    }
    setPresentingElement(page.current);
  }, [pools, group]);

  const hideSelectPoolModal = () => {
    selectPoolModal.current?.dismiss();
  };

  const handleRemoval = (poolToRemove: Challenge) => {
    setAllSelectedPools((prevGroups) =>
      prevGroups.filter((pool) => pool !== poolToRemove)
    );
  };

  const handleUpdateGroup = async () => {
    try {
      if (group) {
        // create pools that are not part of the current pools list
        const poolsToCreate = allSelectedPools.filter(
          (pool) => !pools?.includes((p: any) => pool.id === p.id)
        );
        const tokenContracts = poolsToCreate.map(
          (item) => item.mintingContractAddress
        );
        const honeyAddresses = poolsToCreate.map(
          (item) => item.honeyPotAddress
        );
        const createPoolsResult = await ContractService.createPools(
          group?.publicAddress,
          group?.walletAddress,
          group?.nonceKey,
          tokenContracts,
          honeyAddresses
        );

        const updateGroupResult = await ApiService.updateGroup(groupId, {
          group: updatedGroup,
          pools: allSelectedPools,
        });
        console.log({
          createPoolsResult,
          updateGroupResult,
        });
      }
    } catch (error) {
      console.log(error, "error posting group");
    }
  };

  const handlePoolSelection = (selectedPool: Challenge) => {
    if (allSelectedPools) {
      setAllSelectedPools((prevGroups) => [...prevGroups, selectedPool]);
    }
    hideSelectPoolModal();
  };

  const cancel = () => {
    goBack();
  };

  return (
    <IonPage>
      <Header title="Manage Collective" />

      <IonContent>
        <SelectPoolModal
          trigger="open-manage-collective-modal"
          ref={selectPoolModal}
          presentingElement={presentingElement}
          dismiss={hideSelectPoolModal}
          selectedPools={allSelectedPools}
          handlePoolSelection={handlePoolSelection}
        />
        <IonList inset={true}>
          <IonItem>
            <IonInput
              label={group?.name}
              label-placement="floating"
              placeholder="Enter the name"
              value={updatedGroup.name}
              onIonInput={(e) =>
                setUpdatedGroup((prevGroup) => ({
                  ...prevGroup,
                  name: e.detail.value!,
                }))
              }
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              label={group?.description}
              label-placement="floating"
              placeholder="Enter the description"
              value={updatedGroup.description}
              onIonInput={(e) =>
                setUpdatedGroup((prevGroup) => ({
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
                          {handleDisplayAddress(pool?.creatorOfMint ?? "")}
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
            id="open-manage-collective-modal"
            fill="clear"
            color="primary"
            expand="block"
          >
            + Add Pool
          </IonButton>
        </IonList>

        <div className="button-container">
          <IonButton
            onClick={handleUpdateGroup}
            shape="round"
            disabled={isButtonDisabled}
            color={isButtonDisabled ? "medium" : "primary"}
          >
            Edit Collective
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

export default ManageCollective;
