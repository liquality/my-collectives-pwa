import ApiService from "@/services/ApiService";
import { Group } from "@/types/chat";
import { IonButton, IonCard, IonLabel, IonText, IonTitle } from "@ionic/react";
import { useState } from "react";
interface InviteProps {
  groupId: number | null;
}
const Invite = (props: InviteProps) => {
  const { groupId } = props;
  const [inviteLink, setInviteLink] = useState<string>("");
  const handleGenerateInvite = async () => {
    const result = await ApiService.createInvite({
      group_id: groupId,
    } as Partial<Group>);
    setInviteLink(result.invite_link);
  };

  return (
    <IonCard>
      <IonLabel>Generate invite: </IonLabel>
      <IonButton onClick={handleGenerateInvite}>Generate</IonButton>
      <IonCard>
        {inviteLink ? `http://localhost:5173/invite/${inviteLink}` : null}
      </IonCard>
    </IonCard>
  );
};

export default Invite;
