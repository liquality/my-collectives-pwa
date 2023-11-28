import { useSignInWallet } from "@/hooks/useSignInWallet";
import useToast from "@/hooks/useToast";
import ApiService from "@/services/ApiService";
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
    const result = await ApiService.getInvite(groupId, user.id);
    console.log(result, "result from inv");
    //TODO: get the link from ENV vars when frontend is hosted in prod
    setInviteLink(`http://localhost:5173/invite/${result[0].code}`);
  };

  //const { presentToast } = useToast();

  return <IonText onClick={handleGenerateInvite}>Invite</IonText>;
};

export default GenerateInviteBtn;
