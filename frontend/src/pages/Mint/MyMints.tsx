import { IonPage, IonFab, IonContent, IonIcon, IonLabel } from "@ionic/react";
import {
  convertDateToReadable,
  convertIpfsImageUrl,
  cutOffTooLongString,
  shortenAddress,
} from "@/utils";
import { RouteComponentProps } from "react-router";
import Header from "@/components/Header";
import MintTopBar from "@/components/TopBars/MintTopBar";

import PageSearchBar from "@/components/PageSearchBar";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";
import useGetPoolsByGroupId from "@/hooks/Collective/useGetPoolsByGroupId";

export interface MyMintsProps
  extends RouteComponentProps<{
    groupId: string;
  }> {}
const MyMints: React.FC<MyMintsProps> = (routerProps) => {
  const { groupId } = routerProps.match.params;
  const { group } = useGetGroupById(groupId);
  const { pools, loading } = useGetPoolsByGroupId(
    "a29e1fc6-4e63-4970-b063-802bae62dfef"
  );
  //TODO backend function fetch from user_rewards the poolIds that have been minted from a user
  return (
    <IonPage>
      <Header title="Mint" />

      <IonContent className="ion-padding ">
        <MintTopBar {...routerProps}>
          <PageSearchBar />
        </MintTopBar>

        <div className="mt-3">
          {!loading && pools
            ? pools.map((pool: any, index: number) => (
                <div key={index} className="flexDirectionRow ">
                  <div
                    style={{ width: "100%", backgroundColor: "white" }}
                    className="collective-card generic-grey-card"
                    onClick={() => console.log("Bää")}
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
                            {shortenAddress(pool.creatorOfMint)}
                          </p>
                          <div className="flexDirectionRow mint-icon">
                            <p className="public-address">
                              {" "}
                              <IonLabel>GroupName</IonLabel>{" "}
                              <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>{" "}
                              <IonLabel style={{ marginRight: 10 }}>
                                {pool.totalMints}
                              </IonLabel>{" "}
                              <IonLabel>
                                {" "}
                                {convertDateToReadable(pool.expiration)}{" "}
                              </IonLabel>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <IonFab slot="fixed" vertical="bottom" horizontal="end"></IonFab>
      </IonContent>
    </IonPage>
  );
};

export default MyMints;
