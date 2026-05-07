import * as chatDao from "../dao/chat.dao.js";
import { getAIResponse, getTitle } from "../services/ai.services.js";


export async function handleMessage(req, res) {
    const { content, chatId } = req.body;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();


    const generateTitle = async () => {
        if (!chatId) {
            const data = await getTitle({ message: content })
            const chat = await chatDao.createChat({ title: data.chatTitle, user: req.user.id })
            res.write(`title: ${JSON.stringify({ title: data.chatTitle, chatId: chat._id })}\n\n`)
            return chat
        }
        return null
    }

    const aiStream = async () => {
        const stream = await getAIResponse({ content });

        let AIMessage = ""

        for await (const chunk of stream) {
            // Safely extract text from the chunk, handling different possible Langchain formats
            const text = chunk?.content || chunk?.[0]?.content || chunk?.[0]?.contentBlocks?.[0]?.text || "";
            
            if (text) {
                AIMessage += text;
                res.write(`data: ${JSON.stringify({ text })}\n\n`);
            }
        }

        return AIMessage
    }

    const [ chat, AIMessage ] = await Promise.all([ generateTitle(), aiStream() ])
    console.log(chat)
    console.log(AIMessage)

    // res.write(`data: [DONE]\n\n`);
    res.end()
}