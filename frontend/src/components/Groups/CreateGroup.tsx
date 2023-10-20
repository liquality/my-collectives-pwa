import { useState } from "react";
import { IonItem, IonButton, IonLabel, useIonRouter } from "@ionic/react";
import { GroupCreation } from "@/types/chat";
import ApiService from "@/services/ApiService";

const CreateGroup: React.FC = () => {
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState<number | null>(null);
  const router = useIonRouter();

  const handleEnterChat = async () => {
    const groupObject: GroupCreation = {
      group_name: groupName,
      public_address: "0x0232u326483848787ndas7298bda7289da", //TODO: hardcoded for now but will have to create the contract address from our factory
    };
    try {
      const result = await ApiService.createGroup(groupObject);
      setGroupId(result.id);
      router.push(`messages/${result.id}`);
    } catch (error) {
      console.log(error, "error posting group");
    }
  };

  return (
    <IonItem className="room">
      <IonLabel>Enter group name: </IonLabel>

      <input onChange={(e) => setGroupName(e.target.value)} />
      <IonButton onClick={handleEnterChat}>Create group</IonButton>
    </IonItem>
  );
};

export default CreateGroup;
