import Category from '../models/categoryModel.js'
import asyncHandler from '../middleware/asyncHandler.js'

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(401).json({ error: 'Name is required' })
    }

    const existingCategory = await Category.findOne({ name })
    if (existingCategory) {
      return res.status(401).json({ error: 'Already exits' })
    }

    const category = await new Category({ name }).save()

    res.status(201).json(category)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
})

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body
    const { categoryId } = req.params

    const category = await Category.findOne({ _id: categoryId })

    if (!category) {
      res.status(404).json({ error: 'Category Not found' })
    }

    category.name = name

    const updatedCategory = await category.save()
    res.json(updatedCategory)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params
    const category = await Category.findOne({ _id: categoryId })
    if (!category) {
      res.status(404).json({ error: 'Category Not found' })
    }
    const deletedCategory = await Category.findByIdAndDelete(
      req.params.categoryId
    )
    res.status(200).json(deletedCategory)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

const categoryList = asyncHandler(async (req, res) => {
  try {
    const allCategory = await Category.find({})
    res.json(allCategory)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error.message)
  }
})

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id })
    res.json(category)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error.message)
  }
})

export {
  createCategory,
  updateCategory,
  deleteCategory,
  categoryList,
  readCategory,
}
