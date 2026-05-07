import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat",
        required: true,
    },
    sender: {
        type: String,
        enum: ["user", "ai"],
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

const Message = mongoose.model("message", messageSchema)

export default Message