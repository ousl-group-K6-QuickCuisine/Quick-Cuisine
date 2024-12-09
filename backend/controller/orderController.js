import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'

// Utility function to calculate prices
const calPrices = (orderItems) => {
  // Calculate the items price (sum of price * qty for all order items)
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  // Determine shipping price: if itemsPrice > 100, shipping is free, otherwise it's 10
  const shippingPrice = itemsPrice > 100 ? 0 : 10

  // Define a tax rate (15%)
  const taxRate = 0.15
  const taxPrice = parseFloat((itemsPrice * taxRate).toFixed(2))

  // Calculate total price: itemsPrice + shippingPrice + taxPrice
  const totalPrice = parseFloat(
    (itemsPrice + shippingPrice + taxPrice).toFixed(2)
  )

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  }
}

// Create a new order
const createdOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body

    if (!orderItems || orderItems.length === 0) {
      res.status(400)
      throw new Error('No Order Items')
    }

    // Get products from the database that match the orderItems
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    })

    // Map the order items to ensure they have the correct product data (like price)
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      )

      if (!matchingItemFromDB) {
        res.status(404)
        throw new Error(`Product not found: ${itemFromClient.name}`)
      }

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      }
    })

    // Calculate the prices (items price, shipping, tax, total)
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calPrices(dbOrderItems)

    // Create a new order with the relevant data
    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    })

    // Save the order to the database
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id username')
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Count total orders
const countTotalOrder = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments()
    res.json({ totalOrders })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Calculate total sales
const calculateTotalSales = async (req, res) => {
  try {
    const orders = await Order.find()
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0)
    res.json({ totalSales })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Calculate total sales by date
const calculateTotalSalesByDate = async (req, res) => {
  try {
    const salesByDate = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$paidAt' },
          },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ])
    res.json(salesByDate)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Find order by ID
const findOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'username email'
    )

    if (order) {
      res.status(200).json(order)
    } else {
      res.status(404).json({ error: 'Order not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Mark order as paid
const markAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }

      const updatedOrder = await order.save()
      res.status(200).json(updatedOrder)
    } else {
      res.status(404).json({ error: 'Order not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Mark order as delivered
const markOrderedAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'orderItems.product'
    )

    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    if (!order.isPaid) {
      return res
        .status(400)
        .json({ error: 'Order must be paid before delivery' })
    }

    // Reduce stock for each product in the order
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product)
      if (product) {
        if (product.countInStock < item.qty) {
          return res
            .status(400)
            .json({ error: `Insufficient stock for ${product.name}` })
        }
        product.countInStock -= item.qty
        await product.save()
      }
    }

    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()
    res.status(200).json(updatedOrder)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Export all functions
export {
  createdOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrder,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markAsPaid,
  markOrderedAsDelivered,
}
