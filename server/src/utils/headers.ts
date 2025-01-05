// types
import { IHeadersMap } from "../types/uploads";

// functions
export function getHeaderValue(headers: IHeadersMap, key: string): string | undefined {
  const lowerKey = key.toLowerCase();
  const pascalKey = key
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("-");

  // comparing headers with only lower keys and with pascal keys
  return headers[lowerKey] || headers[pascalKey] || headers[key];
}

export function normalizeHeaders(headers: Record<string, string | undefined>): IHeadersMap {
  const normalized: IHeadersMap = {};

  Object.entries(headers).forEach(([key, value]) => {
    if (value) normalized[key.toLowerCase()] = value;
  });

  return normalized;
}

export function getContentType(headers: IHeadersMap): string {
  const contentType = getHeaderValue(headers, "content-type");
  if (!contentType) throw new Error("Missing Content-Type header");
  return contentType;
}

export function validateMultipartContentType(contentType: string): void {
  if (!contentType.toLowerCase().includes("multipart/form-data")) throw new Error("Invalid content type. Expected multipart/form-data");
}
