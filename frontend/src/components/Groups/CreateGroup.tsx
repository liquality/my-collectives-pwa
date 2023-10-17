import { useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonButton,
  IonLabel,
  useIonRouter,
} from "@ionic/react";
import Chat from "@/components/Chat";
import { Group } from "@/types/chat";
import Header from "@/components/Header";
import ProtectedRoute from "../ProtectedRoute";
import UserService from "@/services/UserService";

const CreateGroup: React.FC = () => {
  const [isInChat, setIsInChat] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState<number | null>(null);
  const router = useIonRouter();

  const handleEnterChat = async () => {
    const groupObject: Group = {
      group_name: groupName,
      public_address: "0x0232u326483848787ndas7298bda7289da", //TODO: hardcoded for now but will have to create the contract address from our factory
    };
    try {
      const result = await UserService.createGroup(groupObject);
      setGroupId(result.id);
      setIsInChat(true);
      router.push(`messages/${result.id}`);
    } catch (error) {
      console.log(error, "error posting group");
    }
  };

  return (
    <IonContent>
      <ProtectedRoute>
        {" "}
        {!isInChat ? (
          <IonItem className="room">
            <IonLabel>Enter group name: </IonLabel>

            <input onChange={(e) => setGroupName(e.target.value)} />
            <IonButton onClick={handleEnterChat}>Create group</IonButton>
          </IonItem>
        ) : (
          <Chat groupName={groupName} groupId={groupId} />
        )}
      </ProtectedRoute>
    </IonContent>
  );
};

export default CreateGroup;
