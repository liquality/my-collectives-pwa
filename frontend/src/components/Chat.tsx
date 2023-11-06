import React, { FormEvent, useEffect, useState } from "react";
import "../theme/chat-box.css";
//@ts-ignore
import ApiService from "../services/ApiService";
import { Group, Message } from "@/types/chat";
import GenerateInvite from "./GenerateInvite";
import { useChatHistory } from "@/hooks/useChatHistory";
import socket from "../services/SocketService"; // Import the socket instance
import { useAccount } from "wagmi";
import {
  IonAvatar,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonRow,
  IonTextarea,
} from "@ionic/react";
import { navigate } from "ionicons/icons";

interface ChatProps {
  group: Group;
}
export const Chat = (props: ChatProps) => {
  const { name, id: groupId, rewards } = props.group;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { chatHistory, loading } = useChatHistory(groupId);
  const { address } = useAccount();

  useEffect(() => {
    if (chatHistory) {
      setMessages(chatHistory);
    }
    socket.on("messageCreation", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]); // Use functional update
    });

    return () => {
      socket.off("messageCreation");
    };
  }, [chatHistory]);

  const handleSendMessage = async () => {
    console.log(newMessage)
    if (newMessage) {
      try {
        const message = {
          content: newMessage,
          groupId,
        };
        const postMessage = await ApiService.createMessage(message);
        console.log(postMessage)
      } catch (error) {
        console.error("Error sending message:", error);
      }
      setNewMessage("");
    }
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonList className="ion-padding" inset={true}>
            <IonListHeader>
              <IonLabel>Group: {name}</IonLabel>
            </IonListHeader>
            {messages.map((message, index) => (
              <IonItem key={index}>
                <IonAvatar aria-hidden="true" slot="start">
                  <img
                    alt=""
                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  />
                </IonAvatar>
                <IonLabel>
                  <h3>{message.userAddress}</h3>
                  <p>{message.content}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
          <IonList className="ion-padding" inset={true}>
            <IonItem lines="none">
              <IonTextarea
                onIonInput={(e) => setNewMessage(e.detail.value!)}
                label="Message"
                placeholder="Type a Message ..."
                label-placement="floating"
                value={newMessage}
                autoGrow={true}
                counter={true}
                maxlength={150}
                counterFormatter={(inputLength, maxLength) =>
                  `${maxLength - inputLength} characters remaining`
                }
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              ></IonTextarea>
              <IonButton slot="end">
                <IonIcon
                  slot="icon-only"
                  onClick={handleSendMessage}
                  icon={navigate}
                ></IonIcon>
              </IonButton>
            </IonItem>
          </IonList>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Chat;
