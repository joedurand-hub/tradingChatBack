import ChatGeneral from "../../models/ChatGeneral.js"
import User from "../../models/User.js"

export const addMessageToChatGeneral = async (req, res, next) => {
    try {
        const { messages } = req.body
        console.log(messages)
        let chat = await ChatGeneral.findOne({ chatId: req.userId })
        
        if (!chat) {
            const newChatWithMessage = new ChatGeneral({ chatId: req.userId, messages })
            const result = await newChatWithMessage.save()
            console.log(result)
        } else {
            chat.messages = chat.messages.concat(messages)
            chat = await chat.save()
        }

        res.status(200).json({ message: "Message added successfully." }) // Responding with success
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "An error occurred." }) // Responding with error
        next(error)
    }
}

export const getMessagesToChatGeneral = async (req, res, next) => {
    try {
        const userAdmin = await User.findOne({email: 'admin@admin.com'})
        const chat = await ChatGeneral.findOne({ chatId: userAdmin._id })
        console.log(chat)
        res.status(200).json(chat)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error })
        next(error)
    }
}