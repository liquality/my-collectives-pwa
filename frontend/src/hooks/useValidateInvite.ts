

import { useState, useEffect } from "react";
import { checkAuth } from "@/utils";
import { Group, Invite } from "@/types/chat";
import UserService from "@/services/UserService";
import { useParams } from "react-router";
//import { getMyGroups } from "safeWrapperSDK";


export function useValidateInvite() {
    const { inviteLink } = useParams<{ inviteLink: string }>();
    const [invitationStatus, setInvitationStatus] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [invite, setInvite] = useState<Invite | null>(null);

    console.log(inviteLink, 'INV link from params')

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setLoading(true)
                const readInvite = await UserService.readInvite(inviteLink)
                console.log(readInvite, 'readinvie')
                setLoading(false)
                if (readInvite.id) {
                    setInvite(readInvite)
                    setInvitationStatus(true);
                } else {
                    setInvitationStatus(false);
                }
            } catch (error) {
                console.log(error, 'Error validating invite')
            }
        };

        fetchGroups();
    }, [invitationStatus]);

    return { invitationStatus, inviteLink, loading, invite };
}

export default useValidateInvite;