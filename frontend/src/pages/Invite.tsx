import useValidateInvite from "@/hooks/useValidateInvite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Invite = () => {
  const { invitationStatus, inviteLink, loading } = useValidateInvite();
  console.log(invitationStatus, "inv status");
  return (
    <div>
      <h1>Invite Confirmation</h1>
      {loading ? (
        <p>Validating your invitation...</p>
      ) : (
        <div>
          {" "}
          {invitationStatus ? (
            <p>Congrats, you joined the group!</p>
          ) : (
            <p>Could not find group invite...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Invite;
