import { Router } from 'express'
import { addMessageToChatGeneral, getMessagesToChatGeneral } from '../controllers/chat/chat-general.controller.js';
import { TokenValidator } from '../libs/tokenValidator.js';

const router = Router()

router.post('/chat-general', TokenValidator, addMessageToChatGeneral)
router.get('/chat-general', getMessagesToChatGeneral)

export default router;