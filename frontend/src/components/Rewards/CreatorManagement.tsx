import useIsActiveRoute from "@/hooks/useIsActiveRoute";
import { IonCol, IonIcon, IonLabel, IonRow, IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import GenerateInviteBtn from "../GenerateInvite";
import { shortenAddress } from "@/utils";

export interface CreatorManagementProps {}

const myChallenges = [
  {
    groupcount: "1",
    id: "031a7481-0cdc-4a4c-98b5-2ec5d99d6551",
    mintingContractAddress: "0x0ca749904757abce70c76ef53b833cf657f59e7e",
    chainId: 5,
    tokenId: "1",
    category: "music",
    name: "0x0ca749904757abce70c76ef53b833cf657f59e7e",
    kind: "erc1155",
    platform: "Zora",
    floorPrice: "0.00188",
    expiration: "2024-01-23T16:58:43.497Z",
    expired: null,
    totalMints: 5,
    imageUrl: null,
    network: "goerli",
    creatorOfMint: null,
    honeyPotAddress: "0xab2cf161C61b4a79E263bC52F4f0197f2D8016CF",
  },
];

const CreatorManagement = (props: CreatorManagementProps) => {
  const isActive = useIsActiveRoute();

  return (
    <IonRow>
      <IonCol>
        <div className="rewards-collective-card">
          <div className="rewards-collective-card-title">
            My Challenges | {myChallenges.length}
          </div>

          {myChallenges?.map((challenge, index) => (
            <div key={index}>
              <IonRow className="ion-justify-content-between ion-align-items-center">
                <div className="rewards-collective-card-group-name">
                  honeyPotAddress
                </div>
                <div className="rewards-collective-card-group-actions">
                  <GenerateInviteBtn groupId={challenge.id} /> |{" "}
                  <IonText
                    color="primary"
                    style={{ pointer: "cursor" }}
                    onClick={() => console.log("hej")}
                  >
                    Manage
                  </IonText>
                </div>
              </IonRow>

              <IonRow className="ion-justify-content-between ion-align-items-center">
                <div className="rewards-collective-card-group-address">
                  {shortenAddress(challenge.honeyPotAddress || "")}
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
    </IonRow>
  );
};

export default CreatorManagement;
