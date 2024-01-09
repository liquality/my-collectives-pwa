import { useSignInWallet } from "@/hooks/useSignInWallet";
import useToast from "@/hooks/useToast";
import ContractService from "@/services/ContractService";
import InvitesService from "@/services/Invites";
import { handleCopyClick } from "@/utils";
import { IonButton, IonText } from "@ionic/react";
import { copy } from "ionicons/icons";

export interface InviteBtnProps {
  groupId: string;
  type?: "button" | "text";
  text?: string;
}

const GenerateInviteBtn = ({
  groupId,
  type = "text",
  text = "Invite",
}: InviteBtnProps) => {
  const url =
    import.meta.env.VITE_CLIENT_PRODUCTION_URL || "http://localhost:5173";

  const { presentToast } = useToast();
  const { user } = useSignInWallet();
  const handleGenerateInvite = async () => {
    presentToast(
      `You generated and copied a invite link! Send it to someone you like :)`,
      "primary",
      copy
    );
    const result = await InvitesService.getInviteByGroupIdAndUserId(
      groupId,
      user.id
    );
    const contractResult = await ContractService.createInviteSig();
    const { inviteSig, inviteId } = contractResult;
    handleCopyClick(`${url}/invite/${result[0].id}/${inviteSig}/${inviteId}`);
  };

  if (type === "button") {
    return <IonButton onClick={handleGenerateInvite}>{text}</IonButton>;
  }
  return (
    <IonText
      color="primary"
      style={{ pointer: "cursor" }}
      onClick={handleGenerateInvite}
    >
      {text}
    </IonText>
  );
};

export default GenerateInviteBtn;
