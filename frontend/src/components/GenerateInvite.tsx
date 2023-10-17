import UserService from "@/services/UserService";
import { Group } from "@/types/chat";
import React, { useEffect, useState } from "react";
interface InviteProps {
  groupId: number | null;
}
const Invite = (props: InviteProps) => {
  const { groupId } = props;
  const [inviteLink, setInviteLink] = useState<string>("");
  const handleGenerateInvite = async () => {
    const result = await UserService.createInvite({
      group_id: groupId,
    } as Partial<Group>);
    console.log(result, "wats result of inv link?");
    setInviteLink(result.invite_link);
  };

  return (
    <div>
      Generate invite: <button onClick={handleGenerateInvite}>Generate</button>
      <div>{inviteLink ? inviteLink : null}</div>
    </div>
  );
};

export default Invite;
