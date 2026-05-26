import { IResPagination } from "@src/models";
import { IPermissionItem } from "@src/models/permission";
import axios from "@src/requests";

const PATH = "/permissions";

const getList = async (search: string) => {
  const response = await axios.get<IResPagination<IPermissionItem>>(`${PATH}${search}`);
  return response.data;
};

const getDetail = async (seq: number) => {
  const response = await axios.get<any>(`${PATH}/${seq}`);
  return response.data;
};

const create = async (data: any) => {
  const response = await axios.post<any>(`${PATH}`, data);
  return response.data;
};

const update = async (seq: number, data: any) => {
  const response = await axios.put<any>(`${PATH}/${seq}`, data);
  return response.data;
};

const remove = async (seq: number) => {
  const response = await axios.delete(`${PATH}/${seq}`);
  return response.data;
};

export const permissonRequests = { getList, getDetail, create, update, remove };
