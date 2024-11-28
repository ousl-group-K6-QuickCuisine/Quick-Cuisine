import path from 'path'
import express from 'express'
import multer from 'multer'
import fs from 'fs'
import { fileURLToPath } from 'url'

const router = express.Router()

// Create __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define the uploads directory
const uploadsDir = path.join(__dirname, '../../uploads')

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }) // Create directory if it doesn't exist
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname)
    cb(null, `${file.fieldname}-${Date.now()}${extname}`)
  },
})

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/

  const extname = path.extname(file.originalname).toLowerCase()
  const mimetype = file.mimetype

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Images only'), false)
  }
}

const upload = multer({ storage, fileFilter })
const uploadSingleImage = upload.single('image')

router.post('/', (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message })
    } else if (req.file) {
      res.status(200).send({
        message: 'Image uploaded successfully',
        image: `/${req.file.path}`,
      })
    } else {
      res.status(400).send({ message: 'No image file provided' })
    }
  })
})

export default router
