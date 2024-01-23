import useIsActiveRoute from "@/hooks/useIsActiveRoute";
import { IonCol, IonIcon, IonLabel, IonRow, IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import {
  convertDateToReadable,
  handleCopyClick,
  shortenAddress,
} from "@/utils";
import useToast from "@/hooks/useToast";
import { copy } from "ionicons/icons";
import useGetChallengesByCreator from "@/hooks/useGetChallengesByCreator";

export interface CreatorManagementProps {}

const CreatorManagement = (props: CreatorManagementProps) => {
  const isActive = useIsActiveRoute();
  const { presentToast } = useToast();
  const { myChallenges, loading: loadingMyChallenges } =
    useGetChallengesByCreator();

  console.log(myChallenges, "mychallenges");

  const handleCopy = (honeyPotAddress: string) => {
    handleCopyClick(honeyPotAddress);
    presentToast(
      "You successfully copied your honey pot address!",
      "primary",
      copy
    );
  };

  return (
    <IonRow>
      {loadingMyChallenges ? null : (
        <IonCol>
          <div className="rewards-collective-card">
            <div className="rewards-collective-card-title">
              My HoneyPots | {myChallenges?.length}
            </div>

            {myChallenges?.map((challenge: any, index: number) => (
              <div key={index}>
                <IonRow className="ion-justify-content-between ion-align-items-center">
                  <div className="rewards-collective-card-group-name">
                    {shortenAddress(challenge.honeyPotAddress || "")}
                  </div>
                  <div className="rewards-collective-card-group-actions">
                    <IonText
                      color="primary"
                      style={{ pointer: "cursor" }}
                      onClick={() => handleCopy(challenge.honeyPotAddress)}
                    >
                      Copy
                    </IonText>
                  </div>
                </IonRow>

                <IonRow className="ion-justify-content-between ion-align-items-center">
                  <div className="rewards-collective-card-group-address">
                    {convertDateToReadable(challenge.expiration)}
                  </div>
                  <div>
                    <IonLabel className="rewards-collective-card-group-data">
                      <IonIcon src="/assets/icons/people-tile.svg"></IonIcon>
                      {challenge.groupcount}
                    </IonLabel>
                    <IonLabel className="rewards-collective-card-group-data">
                      <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>
                      {challenge.totalMints}
                    </IonLabel>
                  </div>
                </IonRow>
              </div>
            ))}
          </div>
        </IonCol>
      )}
    </IonRow>
  );
};

export default CreatorManagement;
