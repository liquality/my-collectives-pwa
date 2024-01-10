import { useState, forwardRef, Ref, useMemo } from "react";
import {
  IonButton,
  IonContent,
  IonModal,
  IonLabel,
  IonIcon,
  IonToolbar,
  IonButtons,
  IonTitle,
} from "@ionic/react";
import { Challenge } from "@/types/challenges";
import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import {
  convertIpfsImageUrl,
  cutOffTooLongString,
  shortenAddress,
} from "@/utils";
import { closeOutline } from "ionicons/icons";

export interface SelectPoolModal {
  presentingElement?: HTMLElement;
  dismiss: () => void;
  trigger: string;
  selectedPools: any[];
  handlePoolSelection: (challenge: Challenge) => void;
}
const SelectPoolModal = forwardRef(function CreateGroupModal(
  {
    presentingElement,
    dismiss,
    selectedPools,
    trigger,
    handlePoolSelection: setSelectedPool,
  }: SelectPoolModal,
  ref: Ref<HTMLIonModalElement>
) {
  const { challenges } = useGetChallenges();
  const [clickedPool, setClickedPool] = useState<Challenge | null>(null);
  let isButtonDisabled = !clickedPool?.mintingContractAddress;

  const handleSelectPool = async () => {
    if (clickedPool) {
      setSelectedPool(clickedPool);
      dismiss();
    }
  };

  const filteredChallenges = useMemo(() => {
    if (challenges && selectedPools) {
      return challenges.filter((challenge) => {
        // check if challengeId exists in selectedPools already
        const existsInSelectedPools = selectedPools.some(
          (selectedPool) =>
            selectedPool?.challengeId === challenge?.id ||
            selectedPool?.id === challenge?.id
        );
        // include challenge if it doesn't exist in selectedPools
        return !existsInSelectedPools;
      });
    } else {
      return [];
    }
  }, [challenges, selectedPools]);

  return (
    <IonModal
      initialBreakpoint={0.95}
      ref={ref}
      trigger={trigger}
      presentingElement={presentingElement!}
    >
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton color="dark" onClick={() => dismiss()}>
            <IonIcon icon={closeOutline} />
          </IonButton>
        </IonButtons>
        <IonTitle>Select Pool</IonTitle>
      </IonToolbar>
      <IonContent className="ion-padding" color="light">
        <div>
          {challenges
            ? filteredChallenges.map((pool: any, index: number) => {
                return (
                  <div key={index} className={`flexDirectionRow parent-hover`}>
                    <div
                      style={{ width: "100%" }}
                      className={
                        `collective-card generic-grey-card` +
                        (clickedPool?.honeyPotAddress === pool.honeyPotAddress
                          ? " selected-pool"
                          : "")
                      }
                      onClick={() => setClickedPool(pool)}
                    >
                      <div className="collective-data-container">
                        <div className="flexDirectionRow">
                          <div className="flexDirectionCol">
                            <img
                              className="row-img"
                              alt="group-avatar"
                              src={convertIpfsImageUrl(pool.imageUrl)}
                            />
                          </div>
                          <div className="flexDirectionCol">
                            <p className="collective-card-name">
                              {cutOffTooLongString(pool.name, 25)}
                            </p>
                            <p className="public-address">
                              {shortenAddress(pool.mintingContractAddress)}
                            </p>
                            <p className="public-address">
                              {" "}
                              <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>{" "}
                              <IonLabel>{pool.totalMints}</IonLabel>{" "}
                              <IonIcon
                                style={{
                                  fontSize: 15,
                                  marginTop: 5,
                                  marginLeft: 5,
                                }}
                                src="/assets/icons/people-tile.svg"
                              ></IonIcon>{" "}
                              <IonLabel>{pool.memberCount}</IonLabel>{" "}
                              <IonIcon
                                style={{
                                  fontSize: 12,
                                  marginTop: 3,
                                  marginLeft: 5,
                                }}
                                src="/assets/icons/message-tile.svg"
                              ></IonIcon>{" "}
                              <IonLabel>{pool.messagesCount}</IonLabel>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>

        <div className="button-container">
          <IonButton
            onClick={handleSelectPool}
            shape="round"
            disabled={isButtonDisabled}
            color={isButtonDisabled ? "medium" : "primary"}
          >
            Select
          </IonButton>
          <IonButton
            onClick={dismiss}
            shape="round"
            fill="clear"
            color="primary"
          >
            Cancel
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
});

export default SelectPoolModal;
