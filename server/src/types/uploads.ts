export interface IHeadersMap {
  [key: string]: string;
}

export interface IUploadedFile {
  filename: string;
  content: Buffer;
  mimetype: string;
}