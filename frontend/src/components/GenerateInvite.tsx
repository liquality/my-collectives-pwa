import { useSignInWallet } from "@/hooks/useSignInWallet";
import useToast from "@/hooks/useToast";
import ContractService from "@/services/ContractService";
import InvitesService from "@/services/Invites";
import { handleCopyClick } from "@/utils";
import { IonButton, IonText } from "@ionic/react";
import { copy } from "ionicons/icons";

export interface InviteBtnProps {
  groupId: string;
  type?: "button" | "text" | "mint";
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
    const result = await InvitesService.getInviteByGroupIdAndUserId(
      groupId,
      user.id
    );
    const contractResult = await ContractService.createInviteSig(
      result[0].code
    );
    const { inviteSig, inviteId } = contractResult;
    const copyUrl = `${url}/invite/${result[0].id}/${inviteSig}/${inviteId}`;
    await refocusAndCopy(copyUrl);
  };

  //TODO: maybe clean up this logic when you have time. It is needed to wrap the copy click in a promise because
  //the DOM refocuses outside the window when you sign with metamask and cant copy the inv signatures
  const refocusAndCopy = (copyUrl: string) => {
    return new Promise((resolve, reject) => {
      const _asyncCopyFn = async () => {
        try {
          handleCopyClick(copyUrl);
          presentToast(
            `You generated and copied a invite link! Send it to someone you like :)`,
            "primary",
            copy
          );
          resolve(copyUrl);
        } catch (e) {
          reject(e);
        }
        window.removeEventListener("focus", _asyncCopyFn);
      };
      window.addEventListener("focus", _asyncCopyFn);
    });
  };

  if (type === "button") {
    return <IonButton onClick={handleGenerateInvite}>{text}</IonButton>;
  } else if (type === "mint")
    return <h4 onClick={handleGenerateInvite}>Invite others to do the same</h4>;
  else {
    return (
      <IonText
        color="primary"
        style={{ pointer: "cursor" }}
        onClick={handleGenerateInvite}
      >
        {text}
      </IonText>
    );
  }
};

export default GenerateInviteBtn;
