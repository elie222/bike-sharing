import { v2 as cloudinary } from 'cloudinary'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from './consts'
import { Stream } from 'stream'

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

interface UploadResult {
  public_id: string
  version: number
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: any[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
}

interface CloudinaryOptions {
  tags?: string
}

export async function uploadImage(file: string): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    return cloudinary.uploader.upload(file, (error, result) => {
      if (error) reject(error)
      else resolve(result)
    })
  })
}

export async function uploadImageStream(
  stream: Stream,
  options?: CloudinaryOptions
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error)
      else resolve(result)
    })

    stream.pipe(uploadStream)
  })
}
