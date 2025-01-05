// utils
import { getHeaderValue } from './headers';

// types
import { IHeadersMap } from '../types/uploads';

export function findPartBoundaries(buffer: Buffer, start: number, end: number) {
  const headerEnd = buffer.indexOf(Buffer.from('\r\n\r\n'), start);
  if (headerEnd === -1 || headerEnd >= end) return null;
  
  return {
    headerStart: start,
    headerEnd,
    contentStart: headerEnd + 4,
    contentEnd: end,
  };
}

export function parsePartHeaders(buffer: Buffer, start: number, end: number): IHeadersMap {
  const headers: IHeadersMap = {};
  const headerText = buffer.slice(start, end).toString('utf8');
  
  headerText.split('\r\n').forEach(line => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return;
    
    const key = line.slice(0, separatorIndex).trim().toLowerCase();
    const value = line.slice(separatorIndex + 1).trim();
    headers[key] = value;
  });
  
  return headers;
}

export function extractFilename(headers: IHeadersMap): string | null {
  const disposition = getHeaderValue(headers, 'content-disposition');
  if (!disposition) return null;
  
  const matches = disposition.match(/filename="([^"]+)"/i);
  return matches ? matches[1] : null;
}