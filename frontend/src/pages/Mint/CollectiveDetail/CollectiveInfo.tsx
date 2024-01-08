import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
} from "@ionic/react";
import { copy } from "ionicons/icons";

import Header from "@/components/Header";
import { RouteComponentProps, useLocation } from "react-router";
import CollectiveTopBar from "@/components/TopBars/CollectiveTopBar";
import PageSearchBar from "@/components/PageSearchBar";
import { getLastIndexOfPath } from "@/utils/routeNames";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";
import { handleCopyClick, shortenAddress } from "@/utils";
import MembersTable from "@/components/Mint/MembersTable";
import GenerateInviteBtn from "@/components/GenerateInvite";
import { useState } from "react";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";

export interface CollectiveInfoProps
  extends RouteComponentProps<{
    groupId: string;
  }> {}

const CollectiveInfo: React.FC<CollectiveInfoProps> = ({ match }) => {
  const { groupId } = match.params;
  const { group, members, loading } = useGetGroupById(groupId);
  console.log(members, "all members?");
  const [inviteLink, setInviteLink] = useState<string>("");

  return (
    <IonPage>
      <Header title={group?.name} />

      {group && !loading ? (
        <IonContent className="ion-padding" color="light">
          <CollectiveTopBar>
            <PageSearchBar />
          </CollectiveTopBar>
          <IonCard className="info-card-container first-card">
            <IonCardTitle>{group?.name}</IonCardTitle>
            <IonCardContent>
              <IonCardSubtitle>
                {shortenAddress(group?.publicAddress || "")}
              </IonCardSubtitle>
              <IonRow>
                <IonCol size="auto">
                  <IonIcon
                    style={{ fontSize: "0.9rem" }}
                    src="/assets/icons/mint-tile.svg"
                  ></IonIcon>
                  <IonLabel>{group?.mintCount || 0}</IonLabel>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon
                    style={{ fontSize: "1rem" }}
                    src="/assets/icons/people-tile.svg"
                  ></IonIcon>
                  <IonLabel>{group?.memberCount || 0}</IonLabel>
                </IonCol>
                <IonCol size="auto">
                  <IonIcon
                    style={{ fontSize: "0.7rem", marginTop: 1 }}
                    src="/assets/icons/message-tile.svg"
                  ></IonIcon>
                  <IonLabel>{group?.messagesCount || 0}</IonLabel>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
          <IonCard className="info-card-container second-card">
            <IonRow className="ion-justify-content-between ion-align-items-center">
              <IonCardTitle>Members | {group?.memberCount || 0} </IonCardTitle>
              <IonText style={{ fontSize: "13px" }}>See All</IonText>
            </IonRow>
            <MembersTable group={group} members={members} />
          </IonCard>
          <IonCard className="info-card-container third-card">
            <IonCardTitle>Collective Rewards | 6 </IonCardTitle>
          </IonCard>

          <IonRow className="manage-group-row ion-padding ion-justify-content-between ion-align-items-center">
            <IonText>
              Manage <IonText style={{ color: "grey" }}>|</IonText>{" "}
              <GenerateInviteBtn groupId={group.id} />
            </IonText>
            <IonText>Leave Collective</IonText>
          </IonRow>
        </IonContent>
      ) : (
        <PageLoadingIndicator />
      )}
    </IonPage>
  );
};

export default CollectiveInfo;
