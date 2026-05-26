import { IResPagination } from "@src/models";
import { IWorkShiftForm, IWorkShiftItem } from "@src/models/work-shift";
import axios from "@src/requests";

const PATH = "/work-sessions";

const getList = async (search: string) => {
  const response = await axios.get<IResPagination<IWorkShiftItem>>(`${PATH}${search}`);
  return response.data;
};

const getCurrentSession = async () => {
  const response = await axios.get<{ session: IWorkShiftItem }>(`${PATH}/current`);
  return response.data?.session;
};

const openSession = async (data: { userId: any }) => {
  const response = await axios.post<any>(`${PATH}/open`, data);
  return response.data;
};

const closeSession = async (data: { userId: any }) => {
  const response = await axios.post<IWorkShiftItem>(`${PATH}/close`, data);
  return response.data;
};

const remove = async (seq: string) => {
  const response = await axios.delete(`${PATH}/${seq}`);
  return response.data;
};

const getDetail = async (seq: string) => {
  const response = await axios.get<IWorkShiftForm>(`${PATH}/${seq}`);
  return response.data;
};

const update = async (seq: string, data: IWorkShiftForm) => {
  const response = await axios.put<IWorkShiftForm>(`${PATH}/${seq}`, data);
  return response.data;
};

export const workShiftRequests = { getList, getCurrentSession, openSession, closeSession, remove, getDetail, update };
