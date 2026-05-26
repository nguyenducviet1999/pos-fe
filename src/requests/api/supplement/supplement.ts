import { IResPagination } from "@src/models";
import { ISupplementForm, ISupplementItem } from "@src/models/supplement";
import axios from "@src/requests";

const PATH = "/supplements";

const getList = async (search: string) => {
  const response = await axios.get<IResPagination<ISupplementItem>>(`${PATH}${search}`);
  return response.data;
};

const getDetail = async (seq: number) => {
  const response = await axios.get<ISupplementItem>(`${PATH}/${seq}`);
  return response.data;
};

const create = async (data: ISupplementForm) => {
  const response = await axios.post<ISupplementForm>(`${PATH}`, data);
  return response.data;
};

const update = async (seq: number, data: ISupplementForm) => {
  const response = await axios.put<ISupplementForm>(`${PATH}/${seq}`, data);
  return response.data;
};

const remove = async (seq: number) => {
  const response = await axios.delete<ISupplementForm>(`${PATH}/${seq}`);
  return response.data;
};

export const supplementRequests = { getList, getDetail, create, update, remove };
