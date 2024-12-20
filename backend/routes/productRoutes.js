import express from 'express'
import Formidable from 'express-formidable'
import { authenticate, AuthorizedAdmin } from '../middleware/authMiddleware.js'
import checkId from '../middleware/checkId.js'

// import Controller
import {
  addFoodItem,
  getFoodItems,
  getFoodItemById,
  updateFoodItemDetails,
  deleteFoodItem,
  allFoodItem,
  addFoodItemReview,
  getTopFoodItem,
  getNewFoodItem,
  filterProducts,
} from '../controller/productController.js'

const router = express.Router()

router
  .route('/')
  .get(getFoodItems)
  .post(authenticate, AuthorizedAdmin, Formidable(), addFoodItem) // we working with form data for need implement Formidable

router.route('/allProducts').get(allFoodItem)
router.route('/:id/reviews').post(authenticate, checkId, addFoodItemReview)

router.route('/top').get(getTopFoodItem)
router.route('/new').get(getNewFoodItem)

router
  .route('/:id')
  .get(getFoodItemById)
  .put(authenticate, AuthorizedAdmin, Formidable(), updateFoodItemDetails)
  .delete(authenticate, AuthorizedAdmin, deleteFoodItem)

router.route('/filtered-products').post(filterProducts)

export default router
