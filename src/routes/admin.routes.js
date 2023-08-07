import { Router } from 'express'
import { signup, getAllUsers, deleteUser} from '../controllers/admin/admin.controller.js';
import { TokenValidator } from '../libs/tokenValidator.js';

const router = Router()

router.post('/admin/registro', signup)
router.get('/admin/traer-usuarios', getAllUsers)
router.delete('/admin/delete/:id',  deleteUser)

export default router;