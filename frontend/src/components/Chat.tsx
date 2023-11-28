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
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("messageCreation");
    };
  }, [chatHistory]);

  const handleSendMessage = async () => {
    console.log(newMessage, "Come hjere");
    if (newMessage) {
      try {
        const message = {
          content: newMessage,
          groupId,
        };
        console.log(message, "");
        const postMessage = await ApiService.createMessage(message);
        console.log(postMessage, "POST MSG??");
        console.log(postMessage);
      } catch (error) {
        console.error("Error sending message:", error);
      }
      setNewMessage("");
    }
  };

  let myMessage;
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

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonList lines="none">
            {messages.map((message, index) => {
              const myMessage = message.userAddress === address;
              const messageStyle = myMessage
                ? myMessageStyle
                : notMyMessageStyle;

              myMessage ? textStyle.color === "black" : textStyle.color;

              return (
                <IonItem style={messageStyle} key={index}>
                  <IonLabel style={textStyle}>
                    {shortenAddress(message.userAddress)}
                    <p style={textStyle}>{message.content}</p>
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
                /*                 counterFormatter={(inputLength, maxLength) =>
                  `${maxLength - inputLength} characters remaining`
                } */
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              ></IonTextarea>
              {/*       <IonButton onClick={handleSendMessage} slot="end">
                <IonIcon slot="icon-only" icon={navigate}></IonIcon>
              </IonButton> */}
            </IonItem>
          </IonList>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Chat;
