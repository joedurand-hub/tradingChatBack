import { Router } from 'express'
import { signup } from '../controllers/admin/admin.controller.js';
// import { TokenValidator } from '../libs/tokenValidator.js';

const router = Router()

router.post('/admin/registro', signup)


export default router;