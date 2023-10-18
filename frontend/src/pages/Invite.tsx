import Chat from "@/components/Chat";
import useValidateInvite from "@/hooks/useValidateInvite";
import UserService from "@/services/UserService";
import { IonButton, useIonRouter } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";

const Invite = () => {
  const { invitationStatus, inviteLink, loading, invite } = useValidateInvite();
  const { address } = useAccount();
  const router = useIonRouter();
  console.log(invite, "INVITE??");
  const handleJoinGroup = async () => {
    //TODO implement join group logic to db here
    try {
      UserService.createMember({
        group_id: invite?.group_id,
        sender: address,
      });
      router.push(`/group/${invite?.group_id}`);
    } catch (error) {
      console.log(error, "Error adding member");
    }
  };
  return (
    <div>
      <h1>Invite Confirmation</h1>
      {loading ? (
        <p>Validating your invitation...</p>
      ) : (
        <div>
          {" "}
          {invitationStatus ? (
            <div>
              Congrats, you have been invited!{" "}
              <IonButton onClick={handleJoinGroup}>Join Group</IonButton>
            </div>
          ) : (
            <p>Could not find group invite...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Invite;
