import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USER, // Should be your full Gmail address
    pass: process.env.SMTP_PASS, // Should be an App Password (not your regular password)
  },
})

export default transporter
