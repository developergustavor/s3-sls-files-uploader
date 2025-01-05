// packages
import { APIGatewayProxyHandler } from 'aws-lambda'

// utils
import { parseMultipartForm } from '../utils/multipart'
import { saveFile } from '../utils/file-storage'

// configs
import { getS3Url } from '../configs/storage'

export const handler: APIGatewayProxyHandler = async event => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  }

  try {
    if (!event.body) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing request body' }) }

    const files = await parseMultipartForm(event)

    if (!files.length) return { statusCode: 400, headers, body: JSON.stringify({ error: 'No files found in request' }) }

    const uploadedFiles = await Promise.all(
      files.map(async file => {
        const savedPath = await saveFile(file)
        return {
          filename: file.filename,
          path: savedPath,
          url: getS3Url(savedPath),
          type: file.mimetype
        }
      })
    )

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Files uploaded successfully',
        files: uploadedFiles
      })
    }
  } catch (error) {
    console.error('Upload error:', error)

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to upload files',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }
}
