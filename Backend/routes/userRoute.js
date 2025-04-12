import express from 'express'

import {verifyToken} from '../middleware/authMiddleware.js';

import { loginUser,registerUser, getCurrentUser, adminLogin } from '../controller/userController.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.get('/current', verifyToken, getCurrentUser);

export default userRouter