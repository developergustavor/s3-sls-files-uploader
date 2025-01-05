// packages
import { APIGatewayProxyEvent } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';

// utils
import { normalizeHeaders, getContentType, validateMultipartContentType } from './headers';
import { extractBoundary } from './boundary';
import { findPartBoundaries, parsePartHeaders, extractFilename } from './part-parser';

// types
import { IUploadedFile } from '../types/uploads';

// functions
export async function parseMultipartForm(event: APIGatewayProxyEvent): Promise<IUploadedFile[]> {
  if (!event.body) throw new Error('Missing request body');

  // Validate headers and get content type
  const headers = normalizeHeaders(event.headers);
  const contentType = getContentType(headers);
  validateMultipartContentType(contentType);

  // Get boundary and create buffer
  const boundary = extractBoundary(contentType);
  const bodyBuffer = Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8');

  return parseMultipartBuffer(bodyBuffer, boundary, event.isBase64Encoded);
}

function parseMultipartBuffer(buffer: Buffer, boundary: string, isBase64: boolean): IUploadedFile[] {
  const files: IUploadedFile[] = [];
  let position = buffer.indexOf(`--${boundary}`);

  while (position !== -1) {
    // Find next boundary
    const nextBoundary = buffer.indexOf(`--${boundary}`, position + boundary.length + 2);
    if (nextBoundary === -1) break;

    // Find part boundaries
    const partBoundaries = findPartBoundaries(buffer, position + boundary.length + 2, nextBoundary);
    if (!partBoundaries) {
      position = nextBoundary;
      continue;
    }

    // Parse headers and extract file info
    const headers = parsePartHeaders(buffer, partBoundaries.headerStart, partBoundaries.headerEnd);
    const filename = extractFilename(headers);

    if (filename) {
      const content = buffer.slice(partBoundaries.contentStart, partBoundaries.contentEnd);
      const cleanContent = content.toString().replace(/\r\n$/, '');
      
      const contentBuffer = isBase64
        ? Buffer.from(cleanContent, 'base64')
        : Buffer.from(cleanContent, 'binary');

      files.push({
        filename: `${uuidv4()}-${filename}`,
        content: contentBuffer,
        mimetype: getContentType(headers) || 'application/octet-stream'
      });
    }

    position = nextBoundary;
  }

  return files;
}