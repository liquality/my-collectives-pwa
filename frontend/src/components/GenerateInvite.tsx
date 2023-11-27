import useToast from "@/hooks/useToast";
import ApiService from "@/services/ApiService";
import { Group } from "@/types/chat";
import { IonButton, IonIcon } from "@ionic/react";
import { copy } from "ionicons/icons";
import { useState } from "react";
interface InviteProps {
  groupId: string;
}
const GenerateInviteBtn = (props: InviteProps) => {
  const { groupId } = props;
  const [inviteLink, setInviteLink] = useState<string>("");
  const handleGenerateInvite = async () => {
    presentToast(`You generated a invite link, click to copy!`);
    /*     const result = await ApiService.createInvite({
      group_id: groupId,
    } as Partial<Group>);
    setInviteLink(result.invite_link); */
  };

  const { presentToast } = useToast();

  return (
    <IonButton
      fill="clear"
      color="primary"
      expand="block"
      onClick={handleGenerateInvite}
    >
      Generate Invite
    </IonButton>

    /*   <IonCard>
        {inviteLink ? `http://localhost:5173/invite/${inviteLink}` : null}
      </IonCard> */
  );
};

export default GenerateInviteBtn;
