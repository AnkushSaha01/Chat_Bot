  import chatModel from "../models/chat.model.js";
  import Message from "../models/massege.model.js";



export async function createChat({ title, user }) {
    const chat = await chatModel.create({ title, user })
    return chat;
}

export async function saveMessage({ chatId, sender, content }) {
    const message = await Message.create({ chatId, sender, content })
    return message;
}