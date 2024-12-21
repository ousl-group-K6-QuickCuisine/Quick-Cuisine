import express from 'express'

const router = express.Router()

import { authenticate, AuthorizedAdmin } from '../middleware/authMiddleware.js'
import {
  createdOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrder,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markAsPaid,
  markOrderedAsDelivered,
} from '../controller/orderController.js'

router
  .route('/')
  .post(authenticate, createdOrder)
  .get(authenticate, AuthorizedAdmin, getAllOrders)

router.route('/mine').get(authenticate, getUserOrders)

router.route('/total-orders').get(authenticate, countTotalOrder)

router.route('/total-sales').get(calculateTotalSales)

router.route('/total-sales-by-date').get(calculateTotalSalesByDate)

router.route('/:id').get(authenticate, findOrderById)

router.route('/:id/pay').put(authenticate, markAsPaid)

router
  .route('/:id/deliver')
  .put(authenticate, AuthorizedAdmin, markOrderedAsDelivered)
export default router
