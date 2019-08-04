import { v2 as cloudinary } from 'cloudinary'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from './consts'

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

export function uploadImage(filename: string) {
  return cloudinary.uploader.upload(filename, (error, result) => {
    console.log(result, error)
  })
}
