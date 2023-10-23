import Chat from "@/components/Chat";
import Header from "@/components/Header";
import useValidateInvite from "@/hooks/useValidateInvite";
import ApiService from "@/services/ApiService";
import { IonButton, useIonRouter } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";

const Invite = () => {
  const { invitationStatus, inviteLink, loading, invite } = useValidateInvite();
  const { address } = useAccount();
  const [error, setError] = useState("");
  const router = useIonRouter();
  console.log(invite, "INVITE??");
  const handleJoinGroup = async () => {
    //TODO implement join group logic to db here
    if (address) {
      try {
        ApiService.createMember({
          group_id: invite?.group_id,
          sender: address,
        });
        router.push(`/messages/${invite?.group_id}`);
      } catch (error) {
        console.log(error, "Error adding member");
      }
    } else {
      setError("Login before you can join the group!");
    }
  };
  return (
    <div>
      <Header />
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
      {error ?? ""}
    </div>
  );
};

export default Invite;
