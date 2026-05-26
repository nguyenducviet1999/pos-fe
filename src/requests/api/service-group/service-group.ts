import { IResPagination } from "@src/models";
import { IServiceGroupForm, IServiceGroupItem } from "@src/models/service-group";
import axios from "@src/requests";

const PATH = "/service-groups";

const getList = async (search: string) => {
  const response = await axios.get<IResPagination<IServiceGroupItem>>(`${PATH}${search}`);
  return response.data;
};

const getDetail = async (seq: number) => {
  const response = await axios.get<{ group: IServiceGroupForm }>(`${PATH}/${seq}`);
  return response.data?.group;
};

const create = async (data: IServiceGroupForm) => {
  const response = await axios.post<IServiceGroupForm>(`${PATH}`, data);
  return response.data;
};

const update = async (seq: number, data: IServiceGroupForm) => {
  const response = await axios.put<IServiceGroupForm>(`${PATH}/${seq}`, data);
  return response.data;
};

const remove = async (seq: number) => {
  const response = await axios.delete(`${PATH}/${seq}`);
  return response.data;
};

export const serviceGroupRequests = { getList, getDetail, create, update, remove };
