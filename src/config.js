import dotenv from 'dotenv'
dotenv.config()
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
export const NODEMAILER_USER_AUTH = process.env.NODEMAILER_USER_AUTH
export const NODEMAILER_PASS_AUTH = process.env.NODEMAILER_PASS_AUTH