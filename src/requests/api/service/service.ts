import { createSearchParams } from "react-router-dom";

import { IResPagination } from "@src/models";
import { IServiceForm, IServiceItem } from "@src/models/service";
import axios from "@src/requests";

const PATH = "/services";
const SERVICE_TASK_PATH = "/service-tasks";

const getList = async (search: string) => {
  const response = await axios.get<IResPagination<IServiceItem>>(`${PATH}${search}`);
  return response.data;
};

const searchList = async (params: any) => {
  const searchParams = createSearchParams(params);
  const response = await axios.get<IResPagination<IServiceItem>>(`${PATH}/search?${searchParams.toString()}`);
  return response.data;
};

const getDetail = async (seq: number) => {
  const response = await axios.get<{ service: IServiceItem }>(`${PATH}/${seq}`);
  return response.data?.service;
};

const create = async (data: IServiceForm) => {
  const response = await axios.post<IServiceForm>(`${PATH}`, data);
  return response.data;
};

const update = async (seq: number, data: IServiceForm) => {
  const response = await axios.put<IServiceForm>(`${PATH}/${seq}`, data);
  return response.data;
};

const remove = async (seq: number) => {
  const response = await axios.delete(`${PATH}/${seq}`);
  return response.data;
};
// ========================= service task =========================
const removeTask = async (taskSeq: number) => {
  const response = await axios.delete(`${SERVICE_TASK_PATH}/${taskSeq}`);
  return response.data;
};

export const serviceRequests = { getList, getDetail, create, update, remove, removeTask, searchList };
