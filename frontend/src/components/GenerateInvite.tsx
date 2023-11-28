import { useSignInWallet } from "@/hooks/useSignInWallet";
import useToast from "@/hooks/useToast";
import ApiService from "@/services/ApiService";
import InvitesService from "@/services/Invites";
import { Group } from "@/types/chat";
import { IonText } from "@ionic/react";

interface InviteProps {
  groupId: string;
  setInviteLink: (invite: string) => void;
  inviteLink: string;
}
const GenerateInviteBtn = (props: InviteProps) => {
  const { groupId, setInviteLink, inviteLink } = props;
  const { user } = useSignInWallet();
  const handleGenerateInvite = async () => {
    //presentToast(`You generated a invite link, click to copy!`);
    //TODO: here it should give you the first invite to copy from userId and groupId
    const result = await ApiService.getInvite(groupId, user.id);
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
