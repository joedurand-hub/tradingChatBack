import { Router } from 'express'
import { signup } from '../controllers/admin/admin.controller.js';
import { TokenValidator } from '../libs/tokenValidator.js';

const router = Router()

router.post('/admin/registro', TokenValidator, signup)
router.post('/admin/traer-usuarios', TokenValidator, signup)


export default router;