import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonTextarea,
} from "@ionic/react";
import Header from "@/components/Header";
import { RouteComponentProps } from "react-router";
import CollectiveTopBar from "@/components/TopBars/CollectiveTopBar";
import PageSearchBar from "@/components/PageSearchBar";
import useGetGroupById from "@/hooks/Groups/useGetGroupById";
import { PageLoadingIndicator } from "@/components/PageLoadingIndicator";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useSignInWallet } from "@/hooks/useSignInWallet";
import ApiService from "@/services/ApiService";
import socket from "@/services/SocketService";
import { Message } from "@/types/general-types";
import { shortenAddress } from "@/utils";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { arrowUpCircle } from "ionicons/icons";

export interface CollectiveChatProps
  extends RouteComponentProps<{
    groupId: string;
  }> {}

const CollectiveChat: React.FC<CollectiveChatProps> = ({ match }) => {
  const { groupId } = match.params;
  const { group, loading } = useGetGroupById(groupId);

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { chatHistory, loading: loadingChat } = useChatHistory(groupId);
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
        console.log({ postMessage });
      } catch (error) {
        console.error("Error sending message:", error);
      }
      setNewMessage("");
    }
  };
  return (
    <IonPage>
      <Header title={group?.name} />
      <IonContent className="ion-padding" color="light">
        <CollectiveTopBar>
          <PageSearchBar />
        </CollectiveTopBar>
        {group && !loading ? (
          <IonList lines="none" className="ion-padding chat-container">
            {messages.map((message, index) => {
              const isMyMessage =
                message.userAddress === address || user.id === message.userId;
              
              return (
                <IonItem key={index}>
                  <div className="chat-item">
                    <div
                      className={`chat-bubble ${
                        isMyMessage ? "left" : "right"
                      }`}
                    >
                      <div className="message">
                        {shortenAddress(
                          (isMyMessage ? address : message?.userAddress) || ""
                        )}
                        <p>{message.content}</p>
                      </div>
                      <div
                        className="message-detail"
                        style={{ float: "right" }}
                      >
                        {message.createdAt}
                      </div>
                    </div>
                  </div>
                </IonItem>
              );
            })}
          </IonList>
        ) : (
          <PageLoadingIndicator />
        )}
      </IonContent>
      <IonFooter className="ion-padding">
        <IonTextarea
          className="chat-message-input"
          onIonInput={(e) => setNewMessage(e.detail.value!)}
          placeholder="Type a Message ..."
          value={newMessage}
          autoGrow={true}
          maxlength={150}
          rows={1}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        >
          <IonButton
            disabled={!newMessage}
            fill="clear"
            slot="end"
          >
            <IonIcon
              slot="icon-only"
              icon={arrowUpCircle}
              aria-hidden="true"
            ></IonIcon>
          </IonButton>
        </IonTextarea>
      </IonFooter>
    </IonPage>
  );
};

export default CollectiveChat;
