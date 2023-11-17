import { useSignInWallet } from "@/hooks/useSignInWallet";
import { Group } from "@/types/chat";
import { shortenAddress } from "@/utils";
import { useIonRouter, IonAvatar } from "@ionic/react";
import React, { useState } from "react";

export interface ChallengeItemCardProps {
  myGroups: Group[] | null;
}

const CollectiveList: React.FC<ChallengeItemCardProps> = ({
  myGroups,
}: ChallengeItemCardProps) => {
  const [loading, setLoading] = useState(true);
  const router = useIonRouter();
  const { user } = useSignInWallet();

  const renderCollectiveListItem = () => {};

  const handleClick = (group: any) => {
    console.log(group.createdBy, "group id createdby", group);
    if (!loading) {
      router.push(`/challenge/${""}?&contractAddress=${""}&imageUrl=${""}`);
    }
  };
  console.log(user?.id, "user id?");

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
                          alt=""
                          src="https://ionicframework.com/docs/img/demos/avatar.svg"
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
                      <p className="public-address">IconX IconY IconZ</p>
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
