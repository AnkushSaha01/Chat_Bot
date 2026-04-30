import { Router } from "express";
import { handleMessage } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

/**
 * @routes POST /api/chats
 * @argument req.body = {content:string,chatId:string?}
 */
chatRouter.post("/", authMiddleware, handleMessage);


export default chatRouter;