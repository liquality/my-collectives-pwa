

import { useState, useEffect } from "react";
import { Invite } from "@/types/chat";
import ApiService from "@/services/ApiService";
import { useParams } from "react-router";


export function useValidateInvite() {
    const { inviteLink } = useParams<{ inviteLink: string }>();
    const [invitationStatus, setInvitationStatus] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [invite, setInvite] = useState<Invite | null>(null);


    useEffect(() => {
        const fetchInvite = async () => {
            try {
                setLoading(true)
                const readInvite = await ApiService.readInvite(inviteLink)
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

        fetchInvite();
    }, [invitationStatus]);

    return { invitationStatus, inviteLink, loading, invite };
}

export default useValidateInvite;