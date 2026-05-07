import { getAiResponse } from "./chat.api";
import {
    setChats,
    appendMessage,
    appendMessageContent,
    appendTempMessage,
    appendTempMessageContent,
    setTempChat,
    setChatFromTempChat
} from "./chat.slice";
import { useDispatch } from "react-redux";


export const useChat = () => {

    const dispatch = useDispatch()

    async function handleGetAIResponse({ message, chatId }) {

        console.log("chatId", chatId)
        if (!chatId) {
            dispatch(appendTempMessage({
                role: "user",
                content: message,
                timestamp: Date.now()
            }))
            dispatch(appendTempMessage({
                role: "ai",
                content: "",
                timestamp: Date.now()
            }))
        } else {
            dispatch(appendMessage({
                chatId,
                message: { role: "user", content: message }
            }))
            dispatch(appendMessage({
                chatId,
                message: { role: "ai", content: "" }
            }))
        }

        await getAiResponse({
            message, chatId,
            onContent: (content) => {
                if (!chatId) {
                    dispatch(appendTempMessageContent({ index: 1, content }))
                } else {
                    dispatch(appendMessageContent({ chatId, content }))
                }
            },
            onChat: (chat) => {
                dispatch(setTempChat({ chat }))
            },
            onComplete: () => {
                if (!chatId) {
                    dispatch(setChatFromTempChat())
                }
            }
        })
    }

    return {
        handleGetAIResponse
    }

}