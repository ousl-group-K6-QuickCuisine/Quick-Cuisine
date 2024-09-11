import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

const authenticate = asyncHandler(async (req, res, next) => {
  let token
  //Read the JWT token from cookie
  token = req.cookies.jwt
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.userId).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not Authorized, token failed')
    }
  } else {
    res.status(401)
    throw new Error('Not Authorized , no token')
  }
})

const AuthorizedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).send('Not Authorized as a admin')
  }
}

export { authenticate, AuthorizedAdmin }
