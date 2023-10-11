import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import UserService from "@/services/UserService";
interface ChatHistoryHookResult {
    chatHistory: Message[] | null;
    loading: boolean
}
export function useChatHistory(groupId: number): ChatHistoryHookResult {
    const [chatHistory, setChatHistory] = useState<Message[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchChat = async () => {
            try {
                if (chatHistory) {
                    setLoading(true)
                    const result = await UserService.readMessagesByGroupId(groupId);
                    setChatHistory(result);
                    setLoading(false)
                }
            } catch (error) {
                console.log(error, 'Error fetching chat history');
            }
        };

        fetchChat();
    }, [chatHistory, groupId]); // Include 'groupId' as a dependency for the effect

    return { chatHistory, loading }; // Return the array of messages directly
}
