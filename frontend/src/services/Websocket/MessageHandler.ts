import eventBus from "./EventBus";
import { Message } from "../../types/chat"
export const messageTypes = {
  CROSSMINT_SUCCESS: "crossmint_success",
};


export default function handleMessage(message: any) {
  const { type, content } = JSON.parse(message.data);
  switch (type) {
    default: {
      eventBus.dispatch(type, content);
      break;
    }
  }
}
