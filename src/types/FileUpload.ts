import { MongoId } from "@/types/MongoDocument";

export interface IFileUpload {
  _id: MongoId,
  name: string,
  size?: number
}

export interface IFileUploadResponse {
  files: IFileUpload[]
}