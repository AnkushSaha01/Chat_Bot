import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../chats/chat.slice"

export const store = configureStore({
    reducer: {
        chat: chatReducer,
    },
})