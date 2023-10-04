import React, { FormEvent, useEffect, useState } from "react";
import "../theme/chat-box.css";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "@/firebase.config";
interface ChatProps {
  group: string;
}

export const Chat = (props: ChatProps) => {
  const { group } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("group", "==", group),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        console.log(doc, "wats doc??");
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage === "") return;

    console.log(auth, "wats auth?");
    const hej = await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      group: group,
    });
    setNewMessage("");
  };
  console.log(messages, "msgs", group);
  return (
    <div className="chat">
      <u>
        WELCOME TO
        <b> {group}</b>
      </u>
      <br></br>
      <br></br>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <span>
              <b>{message.user}</b>
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
    </div>

    /* <ion-item 
  lines="none" 
  [class]="chat?.sender != current_user_id ? 'sender' : 'user'">
  <ion-label 
    [slot]="chat?.sender == current_user_id ? 'end' : 'start'" class="ion-text-wrap">
    <ion-text>{{chat?.message}}</ion-text>
    <ion-note>
      <!-- <small>{{(chat?.createdAt)?.toDate() | date: 'HH:mm'}}</small> -->
      <small>10:00AM</small>
      <ion-icon 
        [color]="chat?.sender == current_user_id ? 'light' : 'primary'" 
        name="checkmark-done-outline"></ion-icon>
    </ion-note>
  </ion-label>
</ion-item> */
  );
};

export default Chat;
