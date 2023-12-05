import { useState, forwardRef, Ref, useMemo } from "react";
import {
  IonButton,
  IonContent,
  IonModal,
  IonLabel,
  IonAvatar,
  IonIcon,
} from "@ionic/react";
import { Challenge } from "@/types/challenges";
import useGetChallenges from "@/hooks/Challenges/useGetChallenges";
import {
  convertIpfsImageUrl,
  cutOffTooLongString,
  shortenAddress,
} from "@/utils";

export interface SelectPoolModal {
  presentingElement?: HTMLElement;
  dismiss: () => void;
  onSuccess?: (groupId: number) => void;
  trigger: string;
  selectedPools: any[];
  handlePoolSelection: (challenge: Challenge) => void;
}
const SelectPoolModal = forwardRef(function CreateGroupModal(
  {
    presentingElement,
    dismiss,
    onSuccess,
    selectedPools,
    trigger,

    handlePoolSelection: setSelectedPool,
  }: SelectPoolModal,
  ref: Ref<HTMLIonModalElement>
) {
  const { challenges, loading } = useGetChallenges();
  const [clickedPool, setClickedPool] = useState<Challenge | null>(null);
  let isButtonDisabled = !clickedPool?.mintingContractAddress;

  const handleSelectPool = async () => {
    if (clickedPool) {
      setSelectedPool(clickedPool);
      dismiss();
    }
  };

  console.log(challenges, "challenges", selectedPools);

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
      initialBreakpoint={0.85}
      ref={ref}
      trigger={trigger}
      presentingElement={presentingElement!}
    >
      <IonContent className="ion-padding" color="light">
        <div className="spaced-on-sides mb-3"></div>
        <div className="mb-3">
          <div className="">
            {challenges
              ? filteredChallenges.map((pool: any, index: number) => (
                  <div key={index} className="flexDirectionRow parent-hover">
                    <div
                      style={{ width: "100%" }}
                      className="collective-card generic-grey-card"
                      onClick={() => setClickedPool(pool)}
                    >
                      <div className="collective-data-container">
                        <div className="flexDirectionRow">
                          <div className="flexDirectionCol">
                            <IonAvatar aria-hidden="true" slot="start">
                              <img
                                alt="group-avatar"
                                src={convertIpfsImageUrl(pool.imageUrl)}
                              />
                            </IonAvatar>
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
                ))
              : null}
          </div>
        </div>
        <div className="button-container">
          <IonButton
            onClick={handleSelectPool}
            shape="round"
            disabled={isButtonDisabled}
            color={isButtonDisabled ? "medium" : "primary"}
          >
            Select Pool
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
