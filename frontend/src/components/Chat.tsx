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
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonRow,
  IonTextarea,
} from "@ionic/react";
import { navigate } from "ionicons/icons";
import { shortenAddress } from "@/utils";
import { useSignInWallet } from "@/hooks/useSignInWallet";
import { PageLoadingIndicator } from "./PageLoadingIndicator";

interface ChatProps {
  group: Group;
}
export const Chat = (props: ChatProps) => {
  const { name, id: groupId, rewards } = props.group;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { chatHistory, loading } = useChatHistory(groupId);
  const { address } = useAccount();
  const { user } = useSignInWallet();

  useEffect(() => {
    if (chatHistory) {
      setMessages(chatHistory);
    }
    socket.on("messageCreation", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("messageCreation");
    };
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (newMessage) {
      try {
        const message = {
          content: newMessage,
          groupId,
        };
        const postMessage = await ApiService.createMessage(message);
        console.log(postMessage);
      } catch (error) {
        console.error("Error sending message:", error);
      }
      setNewMessage("");
    }
  };

  let myMessageStyle = {
    display: "inline-flex",
    padding: "2px 6px",
    alignItems: "flex-start",
    gap: "8px",
    borderRadius: "24px 24px 24px 0px",
    background: "#9747FF",
  };

  const textStyle = {
    color: "#fff",
    fontFeatureSettings: "clig off, liga off",
    fontFamily: "Anek Kannada",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "21px",
    letterSpacing: "0.5px",
  };

  const notMyMessageStyle = {
    display: "flex",
    width: "258px",
    padding: "12px 16px",
    alignItems: "flex-start",
    gap: "8px",
    borderRadius: "24px 24px 0px 24px",
    background: "#EBEAEA",
    marginLeft: "calc(100% - 260px)",
  };

  return address && user ? (
    <IonGrid className="chat-styles">
      <IonRow>
        <IonCol>
          <IonList lines="none">
            {messages.map((message, index) => {
              const myMessage =
                message.userAddress === address || user.id === message.userId;
              const messageStyle = myMessage
                ? myMessageStyle
                : notMyMessageStyle;

              const textColor = myMessage ? textStyle.color : "black";
              return (
                <IonItem style={messageStyle} key={index}>
                  <IonLabel style={{ color: textColor }}>
                    {shortenAddress(myMessage ? address : message.userAddress)}
                    <p style={{ color: textColor }}>{message.content}</p>
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>

          <IonList className="ion-padding">
            <IonItem lines="none">
              <IonTextarea
                className="message-area"
                onIonInput={(e) => setNewMessage(e.detail.value!)}
                placeholder="Type a Message ..."
                value={newMessage}
                autoGrow={true}
                maxlength={150}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              ></IonTextarea>
            </IonItem>
          </IonList>
        </IonCol>
      </IonRow>
    </IonGrid>
  ) : (
    <PageLoadingIndicator />
  );
};

export default Chat;
