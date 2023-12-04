import { useSignInWallet } from "@/hooks/useSignInWallet";
import useToast from "@/hooks/useToast";
import InvitesService from "@/services/Invites";
import { handleCopyClick } from "@/utils";
import { IonText } from "@ionic/react";

interface InviteProps {
  groupId: string;
}
const GenerateInviteBtn = (props: InviteProps) => {
  const url =
    import.meta.env.VITE_CLIENT_PRODUCTION_URL || "http://localhost:5173";

  const { presentToast } = useToast();
  const { groupId } = props;
  const { user } = useSignInWallet();
  const handleGenerateInvite = async () => {
    presentToast(
      `You generated and copied a invite link! Send it to someone you like :)`
    );
    const result = await InvitesService.getInviteByGroupIdAndUserId(
      groupId,
      user.id
    );
    handleCopyClick(`${url}/invite/${result[0].id}`);
  };

  return <IonText onClick={handleGenerateInvite}>Invite</IonText>;
};

export default GenerateInviteBtn;
