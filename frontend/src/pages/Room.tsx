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

const Room = () => {
  const [isInChat, setIsInChat] = useState(false);
  const [room, setRoom] = useState("");
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

              <input onChange={(e) => setRoom(e.target.value)} />
              <IonButton
                onClick={() => {
                  setIsInChat(true);
                }}
              >
                Enter Chat
              </IonButton>
            </IonItem>
          ) : (
            <Chat group={room} />
          )}
        </ProtectedRoute>
      </IonContent>
    </IonPage>
  );
};

export default Room;