

import { useState, useEffect } from "react";
import { checkAuth } from "@/utils";
import { Group } from "@/types/chat";
import UserService from "@/services/UserService";
import { useParams } from "react-router";
//import { getMyGroups } from "safeWrapperSDK";


export function useValidateInvite() {
    const { inviteLink } = useParams<{ inviteLink: string }>();
    const [invitationStatus, setInvitationStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    console.log(inviteLink, 'INV link from params')

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setLoading(true)
                const readInvite = await UserService.readInvite(inviteLink)
                setLoading(false)
                if (readInvite.id) {
                    setInvitationStatus(
                        `You have been invited to join the group!`
                    );

                } else {
                    setInvitationStatus("Invalid invite code");
                }
            } catch (error) {
                console.log(error, 'Error validating invite')
            }

        };

        fetchGroups();
    }, [invitationStatus]);

    return { invitationStatus, inviteLink, loading };
}

export default useValidateInvite;