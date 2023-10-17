import Chat from "@/components/Chat";
import useGetGroupById from "@/components/Groups/useGetGroupById";
import Header from "@/components/Header";
import useValidateInvite from "@/hooks/useValidateInvite";
import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Messages = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { group } = useGetGroupById(groupId);

  const handleGoToGroupMessages = async () => {};
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>Messages!</IonContent>
      <Chat groupId={Number(groupId)} />
    </IonPage>
  );
};

export default Messages;
