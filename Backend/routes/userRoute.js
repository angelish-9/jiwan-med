import express from 'express'

import {verifyToken} from '../middleware/authMiddleware.js';
import adminAuth  from '../middleware/adminAuth.js';

import { loginUser,registerUser, getCurrentUser, adminLogin, updateUserRoleByAdmin, getAllUsers } from '../controller/userController.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.get('/current', verifyToken, getCurrentUser);
userRouter.patch('/update-role/:id', adminAuth, updateUserRoleByAdmin);
userRouter.get('/all', verifyToken, getAllUsers);

export default userRouter