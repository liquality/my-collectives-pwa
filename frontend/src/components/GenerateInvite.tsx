import { useSignInWallet } from "@/hooks/useSignInWallet";
import useToast from "@/hooks/useToast";
import ApiService from "@/services/ApiService";
import InvitesService from "@/services/Invites";
import { IonText } from "@ionic/react";

interface InviteProps {
  groupId: string;
  setInviteLink: (invite: string) => void;
  inviteLink: string;
}
const GenerateInviteBtn = (props: InviteProps) => {
  const url =
    import.meta.env.VITE_CLIENT_PRODUCTION_URL || "http://localhost:5173";

  const { groupId, setInviteLink, inviteLink } = props;
  const { user } = useSignInWallet();
  const handleGenerateInvite = async () => {
    //presentToast(`You generated a invite link, click to copy!`);
    const result = await InvitesService.getInviteByGroupIdAndUserId(
      groupId,
      user.id
    );
    setInviteLink(`${url}/invite/${result[0].id}`);
  };

  //const { presentToast } = useToast();

  return <IonText onClick={handleGenerateInvite}>Invite</IonText>;
};

export default GenerateInviteBtn;
