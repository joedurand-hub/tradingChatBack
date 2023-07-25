import { v2 as cloudinary } from "cloudinary"
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    cloud_name: "ddxa9klhv",
    api_key: "162352614381776",
    api_secret: "qW4p0nItVUSfasNfTinhKxZNQc0",
    secure: true,
})

export async function uploadImage({ filePath }) {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'uploads'
    })
}

export async function deleteImage(publicId) {
    return await cloudinary.uploader.destroy(publicId)
}