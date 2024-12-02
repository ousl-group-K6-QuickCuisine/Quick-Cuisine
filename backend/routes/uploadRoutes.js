import path from 'path'
import express from 'express'
import multer from 'multer'
import fs from 'fs'
import { fileURLToPath } from 'url'

const router = express.Router()

// Create __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define the uploads directory as an absolute path
const uploadsDir = path.resolve(__dirname, '../../uploads') // Ensure we use absolute path

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }) // Create directory if it doesn't exist
}

// Multer setup for file storage and file validation
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

// Initialize multer with the storage and fileFilter options
const upload = multer({ storage, fileFilter })

// Define uploadSingleImage to handle a single file upload (the 'image' field)
const uploadSingleImage = upload.single('image')

router.post('/', (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message })
    } else if (req.file) {
      res.status(200).send({
        message: 'Image uploaded successfully',
        image: `/uploads/${req.file.filename}`, // Correct path for frontend access
      })
    } else {
      res.status(400).send({ message: 'No image file provided' })
    }
  })
})

export default router
