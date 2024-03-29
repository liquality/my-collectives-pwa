import { useState, forwardRef, Ref, useMemo, useEffect } from "react";
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
  convertDateToReadable,
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

        // include challenge if it doesn't exist in selectedPools and is not expired
        return (
          !existsInSelectedPools &&
          convertDateToReadable(challenge.expiration) !== "expired "
        );
      });
    } else {
      return [];
    }
  }, [challenges, selectedPools]);

  console.log(filteredChallenges, "filtered challenges");

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

                            <div
                              className="public-address"
                              style={{ marginTop: 10 }}
                            >
                              <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>{" "}
                              <IonLabel>{pool.totalMints}</IonLabel>{" "}
                              <IonIcon
                                style={{ marginLeft: 10, fontSize: 11 }}
                                src="/assets/icons/challenge-tile.svg"
                              ></IonIcon>{" "}
                              <IonLabel>
                                {" "}
                                {convertDateToReadable(pool.expiration)}
                              </IonLabel>{" "}
                            </div>
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
            Add
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
