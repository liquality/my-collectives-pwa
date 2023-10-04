import React, { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
} from "@ionic/react";
import Chat from "@/components/Chat";
import UserService from "../services/UserService";
import { Group } from "@/types/chat";

const Room = () => {
  const [isInChat, setIsInChat] = useState(false);
  const [group, setGroup] = useState("");

  const handleEnterChat = async () => {
    const groupObject: Group = {
      group_name: group,
    };
    try {
      UserService.createGroup(groupObject);
      setIsInChat(true);
    } catch (error) {
      console.log(error, "error posting group");
    }
  };

  //TODO: add usefecct/custom hook here that fetches all users groups
  //and displays them if he/she is in them, if not display 'create group'
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ProtectedRoute>
          {" "}
          {!isInChat ? (
            <IonItem className="room">
              <IonLabel>Type room name: </IonLabel>

              <input onChange={(e) => setGroup(e.target.value)} />
              <IonButton onClick={handleEnterChat}>Enter Chat</IonButton>
            </IonItem>
          ) : (
            <Chat group={group} />
          )}
        </ProtectedRoute>
      </IonContent>
    </IonPage>
  );
};

export default Room;
