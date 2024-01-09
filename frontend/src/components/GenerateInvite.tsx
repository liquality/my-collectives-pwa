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
    const result = await InvitesService.getInviteByGroupIdAndUserId(
      groupId,
      user.id
    );
    console.log(result, "result for invite");
    const contractResult = await ContractService.createInviteSig(
      result[0].code
    );
    const { inviteSig, inviteId } = contractResult;
    const copyUrl = `${url}/invite/${result[0].id}/${inviteSig}/${inviteId}`;
    console.log(contractResult, "contract result");
    function refocusAndCopy() {
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
    }

    // To call:
    refocusAndCopy().then((r) => console.log("Returned value: ", r));
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
