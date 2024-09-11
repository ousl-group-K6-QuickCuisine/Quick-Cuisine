import express from 'express'
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from '../controller/userController.js'

import { authenticate, AuthorizedAdmin } from '../middleware/authMiddleware.js'
const router = express.Router()

router
  .route('/')
  .post(createUser)
  .get(authenticate, AuthorizedAdmin, getAllUser)

//http://localhost:5000/api/user/auth
router.post('/auth', loginUser)

router.post('/logout', logoutCurrentUser)

router
  .route('/profile')
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile)

// Admin Routes
router
  .route('/:id')
  .delete(authenticate, AuthorizedAdmin, deleteUserById)
  .get(authenticate, AuthorizedAdmin, getUserById)
  .put(authenticate, AuthorizedAdmin, updateUserById)
export default router
