import {
  IonPage,
  IonFab,
  IonContent,
  IonIcon,
  IonLabel,
  IonText,
} from "@ionic/react";
import {
  convertDateToReadable,
  convertIpfsImageUrl,
  cutOffTooLongString,
  handleDisplayAddress,
  shortenAddress,
} from "@/utils";
import { RouteComponentProps } from "react-router";
import Header from "@/components/Header";
import MintTopBar from "@/components/TopBars/MintTopBar";
import PageSearchBar from "@/components/PageSearchBar";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";
import useGetChallengesByGroupId from "@/hooks/Collective/useGetChallengesByGroupId";
import { useMemo, useState } from "react";
import useGetMyMints from "@/hooks/Collective/useGetMyMints";

export interface MyMintsProps
  extends RouteComponentProps<{
    groupId: string;
  }> {}
const MyMints: React.FC<MyMintsProps> = (routerProps) => {
  const { groupId } = routerProps.match.params;
  const { group } = useGetGroupById(groupId);
  /*   const { pools, loading } = useGetChallengesByGroupId(
    "245d7847-9d60-477a-970c-4c5e151736d8"
  ); */
  const { myMints, loading } = useGetMyMints();
  const [mintFilter, setMintFilter] = useState("");

  //TODO backend function fetch from user_rewards the poolIds that have been minted from a user and all the groups
  const filteredMints = useMemo(() => {
    let filteredMints = myMints || [];

    if (mintFilter === "challenge") {
      filteredMints = [...filteredMints].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (mintFilter === "expiration") {
      filteredMints = [...filteredMints].sort(
        (a, b) =>
          new Date(a.expiration).getTime() - new Date(b.expiration).getTime()
      );
    }

    return filteredMints;
  }, [myMints, mintFilter]);

  return (
    <IonPage>
      <Header title="Mint" />

      <IonContent className="ion-padding ">
        <MintTopBar {...routerProps}>
          <PageSearchBar />
        </MintTopBar>

        <div className="space-between mt-3">
          <div className="flexDirectionRow  " style={{ width: "95%" }}>
            <p className="public-address">Sort by:</p>
            <p
              onClick={() => setMintFilter("expiration")}
              className={
                mintFilter === "expiration"
                  ? "public-address-purple"
                  : "public-address"
              }
            >
              Expiration
            </p>{" "}
            <p className="public-address">|</p>
            <p
              onClick={() => setMintFilter("challenge")}
              className={
                mintFilter === "challenge"
                  ? "public-address-purple"
                  : "public-address"
              }
            >
              Challenge
            </p>{" "}
          </div>
          {/*   <IonText
            color="primary"
            style={{ pointer: "cursor" }}
            onClick={handleWithDrawal}
          >
            Withdraw{" "}
          </IonText> */}
        </div>

        <div>
          {!loading && myMints
            ? filteredMints.map((myMint: any, index: number) => (
                <div key={index} className="flexDirectionRow">
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
                            src={convertIpfsImageUrl(myMint.imageUrl)}
                          />
                        </div>
                        <div className="flexDirectionCol">
                          <p className="collective-card-name">
                            {cutOffTooLongString(myMint.name, 25)}
                          </p>
                          <p className="public-address">
                            {handleDisplayAddress(myMint.creatorOfMint)}
                          </p>
                          <div className="flexDirectionRow mint-icon">
                            <p className="public-address">
                              {" "}
                              <IonLabel>
                                {myMint.kind} | {myMint.platform}
                              </IonLabel>{" "}
                              <IonIcon src="/assets/icons/mint-tile.svg"></IonIcon>{" "}
                              <IonLabel style={{ marginRight: 10 }}>
                                {myMint.ownershipTokenCount}
                              </IonLabel>{" "}
                              <IonLabel>
                                {" "}
                                {convertDateToReadable(myMint.expiration)}{" "}
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
