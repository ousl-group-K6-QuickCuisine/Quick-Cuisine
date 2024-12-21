import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

const addFoodItem = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, foodType } =
      req.fields
    // validation
    switch (true) {
      case !name:
        return res.status(400).json({ error: 'Name is required' })
      case !description:
        return res.status(400).json({ error: 'description is required' })
      case !price:
        return res.status(400).json({ error: 'price is required' })
      case !category:
        return res.status(400).json({ error: 'category is required' })
      case !quantity:
        return res.status(400).json({ error: 'quantity is required' })
      case !foodType:
        return res.status(400).json({ error: 'foodType is required' })
    }
    const item = new Product({ ...req.fields })
    await item.save()
    res.json(item)
    console.log(item)
  } catch (error) {
    console.log(error)
    res.status(400).json(error.message)
  }
})

const updateFoodItemDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, foodType } =
      req.fields
    // validation
    switch (true) {
      case !name:
        return res.status(400).json({ error: 'Name is required' })
      case !description:
        return res.status(400).json({ error: 'description is required' })
      case !price:
        return res.status(400).json({ error: 'price is required' })
      case !category:
        return res.status(400).json({ error: 'category is required' })
      case !quantity:
        return res.status(400).json({ error: 'quantity is required' })
      case !foodType:
        return res.status(400).json({ error: 'foodType is required' })
    }

    const item = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    )
    res.json(item)
  } catch (error) {
    console.error(error)
    res.status(400).json(error.message)
  }
})

const deleteFoodItem = asyncHandler(async (req, res) => {
  try {
    const item = await Product.findByIdAndDelete(req.params.id)
    res.json(item)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: 'Sever error' })
  }
})

const getFoodItems = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {}

    const count = await Product.countDocuments({ ...keyword })
    const items = await Product.find({ ...keyword }).limit(pageSize)

    res.json({
      items,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: 'Sever error' })
  }
})

const getFoodItemById = asyncHandler(async (req, res) => {
  try {
    const item = await Product.findById(req.params.id)
    if (item) {
      res.json(item)
    } else {
      res.status(404)
      throw new Error('Food not found')
    }
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: 'Food not found' })
  }
})

const allFoodItem = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('category')
      .limit(12)
      .sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: 'Sever error' })
  }
})

const addFoodItemReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )

      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }

      product.reviews.push(review)

      product.numReviews = product.reviews.length

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length

      await product.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  } catch (error) {
    console.error(error)
    res.status(400).json(error.message)
  }
})

const getTopFoodItem = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find({}).sort({ rating: -1 }).limit(4)
    res.json(product)
  } catch (error) {
    console.error(error)
    res.status(400).json(error.message)
  }
})

const getNewFoodItem = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find().sort({ _id: 1 }).limit(5)
    res.json(product)
  } catch (error) {
    console.error(error)
    res.status(400).json(error.message)
  }
})

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body

    let args = {}
    if (checked.length > 0) args.category = checked
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }

    const products = await Product.find(args)
    res.json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server Error' })
  }
})

export {
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
}
