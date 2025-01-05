// packages
import { S3Client } from '@aws-sdk/client-s3'

// constants
import { BUCKET_DEFAULT_FOLDER } from '../constants/uploads'

// variables
const IS_OFFLINE = (process.env.NODE_ENV as string) === 'development'

export const s3Client = new S3Client({
  region: IS_OFFLINE ? 'us-east-1' : (process.env.ACCESS_REGION as string),
  endpoint: IS_OFFLINE ? `http://${process.env.LOCALSTACK_HOST}:${process.env.LOCALSTACK_PORT}` : undefined,
  forcePathStyle: IS_OFFLINE,
  credentials: {
    accessKeyId: IS_OFFLINE ? 'test' : (process.env.ACCESS_KEY_ID as string),
    secretAccessKey: IS_OFFLINE ? 'test' : (process.env.ACCESS_KEY_SECRET as string)
  }
})

export const UPLOAD_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  // mimeTypes are customizable
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
}

// functions
export function generateS3Key(filename: string): string {
  const timestamp = new Date().toISOString().split('T')[0]
  return `${BUCKET_DEFAULT_FOLDER}/${timestamp}/${filename}`
}

export function getS3Url(key: string): string {
  if (IS_OFFLINE) return `http://${process.env.LOCALSTACK_HOST}:${process.env.LOCALSTACK_PORT}/${process.env.BUCKET_NAME}/${key}`
  return `https://${process.env.BUCKET_NAME}.s3.${process.env.ACCESS_REGION}.amazonaws.com/${key}`
}
