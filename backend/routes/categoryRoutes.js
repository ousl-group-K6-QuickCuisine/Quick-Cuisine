import express from 'express'
import { authenticate, AuthorizedAdmin } from '../middleware/authMiddleware.js'
import {
  createCategory,
  updateCategory,
  deleteCategory,
  categoryList,
  readCategory,
} from '../controller/categoryController.js'
const router = express.Router()

router.route('/').post(authenticate, AuthorizedAdmin, createCategory)
router.route('/:categoryId').put(authenticate, AuthorizedAdmin, updateCategory)
router
  .route('/:categoryId')
  .delete(authenticate, AuthorizedAdmin, deleteCategory)
router.route('/categories').get(categoryList)
router.route('/:id').get(readCategory)

export default router
