export interface IRes<T> {
  code: string;
  message: string;
  data: T;
  baseUrl?: string; // use for nation list
}

export interface IResData<T> {
  content: T[];
  last?: boolean;
  totalElements?: number;
}

// export interface IResPagination<T> extends IResData<T> {
//   totalPages: number;
//   first: boolean;
//   last: boolean;
//   size: number;
//   number: number;
//   page: number;
//   totalElements: number;
//   numberOfElements: number;
//   empty: boolean;
// }

export interface IResPagination<T> {
  content: T[];
  pagination: { total: number; page: number; pageSize: number };
}

export interface IFileInfoAPI {
  fileType?: string;
  originFileName?: string;
  uploadedFileName?: string;
  fileUrl?: string;
  fileSize?: number;
  objectName?: string;
}

export interface IFileS3Info {
  fileId?: number;
  fileType: string;
  fileUrl: string;
  fileSize: number;
  objectName: string;
  originFileName: string;
  uploadedFileName: string;
  file?: File;
}

export interface IFileS3InfoResponse {
  createdBy: number;
  createdDate: string;
  deleted: number;
  fileId: number;
  fileKey: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  fileUrl: string;
  lastUpdateBy: number;
  lastUpdateDate: string;
}

export interface ITreeNode {
  checked?: boolean;
  key?: string;
  value?: string;
  label?: string;
  children?: ITreeNode[];
  disabled?: boolean;
}

export interface IResponseOption {
  name?: string;
  code: string;
  logName?: string;
}
export interface IJWTPayload {
  login_id: string;
  country: string;
  aud: string[];
  scope: string[];
  feature_bit: number;
  usr_no: number;
  exp: number;
  jti: string;
  client_id: string;
}
