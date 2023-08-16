import { Schema, model } from 'mongoose'

const chatGeneralSchema = new Schema({
    chatId: {
        type: String, required: false, trim: true
    },
    messages: { 
        type: [String], default: ['Bienvenido al chat general']
    },
}, { timestamps: true, versionKey: false, })

export default model('ChatGeneral', chatGeneralSchema)