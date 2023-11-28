import useToast from "@/hooks/useToast";
import ApiService from "@/services/ApiService";
import InvitesService from "@/services/Invites";
import { Group } from "@/types/chat";
import { IonButton, IonIcon, IonText } from "@ionic/react";
import { copy } from "ionicons/icons";
import { useState } from "react";
interface InviteProps {
  groupId: string;
  setInviteLink: (invite: string) => void;
  inviteLink: string;
}
const GenerateInviteBtn = (props: InviteProps) => {
  const { groupId, setInviteLink, inviteLink } = props;
  const handleGenerateInvite = async () => {
    //presentToast(`You generated a invite link, click to copy!`);
    const result = await InvitesService.createInvite({
      group_id: groupId,
    } as Partial<Group>);
    console.log(result, "wats result?");
    setInviteLink(result.invite_link);
  };

  //const { presentToast } = useToast();

  return (
    <IonText onClick={handleGenerateInvite}>Invite</IonText>

    /*   <IonCard>
        {inviteLink ? `http://localhost:5173/invite/${inviteLink}` : null}
      </IonCard> */
  );
};

export default GenerateInviteBtn;
