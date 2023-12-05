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
import { RouteComponentProps, useHistory, useParams } from "react-router";
import Header from "@/components/Header";
import { useSignInWallet } from "@/hooks/useSignInWallet";
import { pathConstants } from "@/utils/routeNames";
import { Challenge } from "@/types/challenges";
import SelectPoolModal from "../Mint/SelectPoolModal";
import useGetPoolsByGroupId from "@/hooks/Collective/useGetPoolsByGroupId";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";

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
  const { user } = useSignInWallet();
  const router = useIonRouter();
  const { groupId } = useParams<{ groupId: string }>();
  const { pools, loading } = useGetPoolsByGroupId(groupId);
  const { group } = useGetGroupById(groupId);

  const [updatedGroup, setUpdatedGroup] = useState({
    name: "",
    description: "",
  });

  const [allSelectedPools, setAllSelectedPools] = useState<Challenge[]>([]);
  const selectPoolModal = useRef<HTMLIonModalElement>(null);
  const isButtonDisabled = !updatedGroup.description || !updatedGroup.name;
  const page = useRef(undefined);

  useEffect(() => {
    if (pools && !allSelectedPools.length) {
      setAllSelectedPools(pools);
    }
  }, [pools, group]);

  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  const hideSelectPoolModal = () => {
    selectPoolModal.current?.dismiss();
  };

  const handleRemoval = (poolToRemove: Challenge) => {
    setAllSelectedPools((prevGroups) =>
      prevGroups.filter((pool) => pool !== poolToRemove)
    );
  };

  const handleCreateGroup = async () => {
    // ... existing code

    try {
      const result = await ApiService.createGroup({
        group: groupObject,
        pools: allSelectedPools,
      });

      // ... existing code
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
          trigger="open-create-challenge-modal"
          ref={selectPoolModal}
          presentingElement={presentingElement}
          dismiss={hideSelectPoolModal}
          selectedPools={allSelectedPools}
          setSelectedPool={handlePoolSelection}
        />
        <IonList inset={true}>
          <IonItem>
            <IonInput
              label={group?.name}
              label-placement="floating"
              placeholder="Enter the name"
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
                    <p> {pool?.tokenId}</p>
                    <p
                      className="small-purple-text"
                      onClick={() => handleRemoval(pool)}
                    >
                      Remove
                    </p>
                  </div>
                  <p>{pool?.name}</p>
                  <IonLabel>Creator: {pool?.creatorOfMint}</IonLabel>
                </div>
              ))
            : null}

          <IonButton
            id="open-create-challenge-modal"
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
