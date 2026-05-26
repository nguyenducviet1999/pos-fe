import { AxiosProgressEvent } from "axios";

import { PREFIX_API_FILE_STORE } from "@src/constants/upload-file";
import { IFileS3Info, IFileS3InfoResponse, IRes } from "@src/models";
import axios from "@src/requests";

const uploadFileKey = async (stringAPI: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post<IRes<number>>(stringAPI, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const getFileKey = async (stringAPI: string) => {
  const response = await axios.get<IRes<IFileS3InfoResponse[]>>(stringAPI);
  return response.data.data;
};

const uploadFile = async (
  uploadPostAPI: string,
  file: File,
  onUploadProgress?: (event: AxiosProgressEvent) => void,
  onDownloadProgress?: (event: AxiosProgressEvent) => void,
  keyFile: string = "file",
  objectFormData?: any,
) => {
  const formData = new FormData();
  formData.append(keyFile, file);
  if (objectFormData) {
    Object.keys(objectFormData).forEach((keyItem) => {
      formData.append(keyItem, objectFormData[keyItem]);
    });
  }
  const response = await axios.post<IRes<IFileS3Info>>(uploadPostAPI, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
    onDownloadProgress,
  });
  return response.data;
};

const deleteFile = async (id: number) => {
  const response = await axios.delete<IRes<number>>(`${PREFIX_API_FILE_STORE}/${id}`);
  return response.data;
};

export const fileS3Request = {
  uploadFileKey,
  getFileKey,
  uploadFile,
  deleteFile,
};
