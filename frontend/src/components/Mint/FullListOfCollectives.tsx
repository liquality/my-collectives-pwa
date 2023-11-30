import { useSignInWallet } from "@/hooks/useSignInWallet";
import { Group } from "@/types/chat";
import { shortenAddress } from "@/utils";
import { pathConstants } from "@/utils/routeNames";
import {
  useIonRouter,
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import React, { useState } from "react";
import GenerateInviteBtn from "../GenerateInvite";

export interface ChallengeItemCardProps {
  myGroups: Group[] | null;
}

const CollectiveList: React.FC<ChallengeItemCardProps> = ({
  myGroups,
}: ChallengeItemCardProps) => {
  const [loading, setLoading] = useState(true);
  const router = useIonRouter();
  const { user } = useSignInWallet();

  const handleClick = (group: any) => {
    const url = pathConstants.collectiveDetail.mints.replace(
      ":groupId",
      group.id
    );
    router.push(url, "root");
  };

  return (
    <div className="">
      {myGroups
        ? myGroups.map((group: any, index: number) => (
            <div key={index} className="flexDirectionRow parent-hover">
              <div
                className="collective-card generic-grey-card"
                onClick={() => handleClick(group)}
              >
                <div className="collective-data-container">
                  <div className="flexDirectionRow">
                    <div className="flexDirectionCol">
                      <IonAvatar aria-hidden="true" slot="start">
                        <img
                          className="filter-img"
                          alt="group-avatar"
                          src={`https://api.multiavatar.com/${group.name}.png`}
                        />
                      </IonAvatar>
                      {user?.id === group.createdBy ? (
                        <div className="admin-tag">ADMIN</div>
                      ) : null}
                    </div>
                    <div className="flexDirectionCol">
                      <p className="collective-card-name">{group.name}</p>
                      <p className="public-address">
                        {shortenAddress(group.publicAddress)}
                      </p>
                      <p className="public-address">
                        {" "}
                        <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>{" "}
                        <IonLabel>{group.poolsCount}</IonLabel>{" "}
                        <IonIcon
                          style={{ fontSize: 15, marginTop: 5, marginLeft: 5 }}
                          src="/assets/icons/people-tile.svg"
                        ></IonIcon>{" "}
                        <IonLabel>{group.memberCount}</IonLabel>{" "}
                        <IonIcon
                          style={{ fontSize: 12, marginTop: 3, marginLeft: 5 }}
                          src="/assets/icons/message-tile.svg"
                        ></IonIcon>{" "}
                        <IonLabel>{group.messagesCount}</IonLabel>{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collective-card-right generic-grey-card"></div>
            </div>
          ))
        : null}
    </div>
  );
};

export default CollectiveList;
