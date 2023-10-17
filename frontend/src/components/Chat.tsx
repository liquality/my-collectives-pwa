import React, { FormEvent, useEffect, useState } from "react";
import "../theme/chat-box.css";
//@ts-ignore
import UserService from "../services/UserService";
import { Group, Message } from "@/types/chat";
import GenerateInvite from "./GenerateInvite";
import { useChatHistory } from "@/hooks/useChatHistory";
import socket from "../services/SocketService"; // Import the socket instance

interface ChatProps {
  group: Group;
}
export const Chat = (props: ChatProps) => {
  const { group_name, id, rewards } = props.group;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { chatHistory, loading } = useChatHistory(id as number);

  useEffect(() => {
    if (chatHistory) {
      setMessages(chatHistory);
    }
    socket.on("messageCreation", (data) => {
      const newMessage = data;
      setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
      console.log("Websocket event sent from db", data);
    });

    return () => {
      socket.off("messageCreation");
    };
  }, [chatHistory, messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage === "") return;
    //submit message to db

    try {
      const message = {
        sender: "0x012", //TODO replace with user public address
        text: newMessage,
        group_id: id as number,
      };
      const postMessage = await UserService.createMessage(message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setNewMessage("");
  };
  console.log(messages, "msgs", id, newMessage);
  console.log(group_name, "props?", props);
  return (
    <div className="chat">
      <u>
        WELCOME TO
        <b> {group_name}</b>
      </u>
      <br></br>
      <br></br>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <span>
              <b>{message.sender}</b>
            </span>
            <div>{message.text}</div>{" "}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type message.."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        ></input>
        <button type="submit">Send</button>
      </form>
      <GenerateInvite groupId={id as number} />
    </div>
  );
};

export default Chat;
