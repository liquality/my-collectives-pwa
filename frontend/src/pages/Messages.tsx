import Chat from "@/components/Chat";
import useGetGroupById from "@/components/Groups/useGetGroupById";
import Header from "@/components/Header";
import useValidateInvite from "@/hooks/useValidateInvite";
import { IonContent, IonPage, IonTitle } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Messages = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { group, loading } = useGetGroupById(groupId);
  console.log(groupId, "groupid in msgs and", group);

  const handleGoToGroupMessages = async () => {};
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        {!loading && group ? (
          <Chat group={group} />
        ) : (
          <IonTitle>Loading..</IonTitle>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Messages;
