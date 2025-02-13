import user from '../models/userModel.js'
import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs' //for password secure
import createToken from '../utils/createToken.js'

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    throw new Error('Please fill the all the inputs')
  }
  const userExits = await User.findOne({ email })
  if (userExits) res.status(400).send('User already exits')

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = new User({ username, email, password: hashedPassword })
  try {
    await newUser.save()
    createToken(res, newUser._id)
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      isAdmin: newUser.isAdmin,
    })
  } catch (error) {
    res.status(400)
    throw new Error('Invalid User')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    )
    if (isValidPassword) {
      createToken(res, existingUser._id)

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        password: existingUser.password,
        isAdmin: existingUser.isAdmin,
      })
      return
    } else {
      res.status(401) // Unauthorized
      throw new Error('Invalid email or password')
    }
  }
})

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).send({ message: 'Logged out Successfully' })
})

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    })
  } else {
    res.status(401)
    throw new Error('User not found')
  }
})

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      user.password = hashedPassword
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error('User not found')
  }
})

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    if (user.isAdmin) {
      res.status(400)
      throw new Error('Cant delete Admin User')
    }
    await User.deleteOne({ _id: user._id })
    res.json({ msg: 'User is Removed' })
  } else {
    res.status(400)
    throw new Error('User not Found')
  }
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.status(200)
    res.json(user)
  } else {
    res.status(400)
    throw new Error('User not found')
  }
})

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.isAdmin = Boolean(req.body.isAdmin)

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error('User not found')
  }
})
export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
}
