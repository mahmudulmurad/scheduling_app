import express from 'express';
const router = express.Router();
import { SignUp, Login } from '../controller/Auth';

router.post('/signup', SignUp);
router.post('/login', Login);

export default router;
