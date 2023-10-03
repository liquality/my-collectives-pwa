import React, { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
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
            <div className="room">
              <label> Type room name: </label>
              <input onChange={(e) => setRoom(e.target.value)} />
              <button
                onClick={() => {
                  setIsInChat(true);
                }}
              >
                Enter Chat
              </button>
            </div>
          ) : (
            <Chat group={room} />
          )}
          ;
        </ProtectedRoute>
      </IonContent>
    </IonPage>
  );
};

export default Room;
