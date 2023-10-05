import useValidateInvite from "@/hooks/useValidateInvite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Invite = () => {
  const { invitationStatus, inviteCode, loading } = useValidateInvite();
  return (
    <div>
      <h1>Invite Confirmation</h1>
      {invitationStatus && !loading ? (
        <p>{invitationStatus}</p>
      ) : (
        <p>Validating your invitation...</p>
      )}
    </div>
  );
};

export default Invite;
