// packages
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";
import { Upload } from "@aws-sdk/lib-storage";

// configs
import { s3Client, generateS3Key } from "../configs/storage";

// types
import { IUploadedFile } from "../types/uploads";

// constants
import { TMP_UPLOAD_DIR } from "../constants/uploads";

// variables
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

// functions
async function ensureTmpDir() {
  await mkdir(TMP_UPLOAD_DIR, { recursive: true });
}

async function saveToTmp(file: IUploadedFile): Promise<string> {
  await ensureTmpDir();
  const tmpPath = path.join(TMP_UPLOAD_DIR, file.filename);

  // Write file using binary encoding
  await writeFile(tmpPath, file.content, "binary");
  return tmpPath;
}

async function uploadToS3FromTmp(tmpPath: string, key: string, mimetype: string): Promise<string> {
  // Read file as binary
  const fileContent = await readFile(tmpPath, { encoding: null });

  try {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.BUCKET_NAME as string,
        Key: key,
        Body: fileContent,
        ContentType: mimetype,
        ContentEncoding: "binary",
      },
    });

    await upload.done();
    return key;
  } finally {
    // Clean up tmp file
    fs.unlink(tmpPath, (err) => {
      if (err) console.error("Error cleaning up tmp file:", err);
    });
  }
}

export async function saveFile(file: IUploadedFile): Promise<string> {
  // uncomment this if you want to save files locally
  /* if ((process.env.NODE_ENV as string) === "development") {
    const localPath = path.join(TMP_UPLOAD_DIR, file.filename);
    await mkdir(path.dirname(localPath), { recursive: true });
    await writeFile(localPath, file.content, "binary");
    return localPath;
  } */

  try {
    const tmpPath = await saveToTmp(file);
    const s3Key = generateS3Key(file.filename);
    return await uploadToS3FromTmp(tmpPath, s3Key, file.mimetype);
  } catch (error) {
    console.error("Error in file upload:", error);
    throw error;
  }
}
