import { IResPagination } from "@src/models";
import { IRoleForm, IRoleItem } from "@src/models/role";
import axios from "@src/requests";

const PATH = "/roles";

const getList = async (search: string) => {
  const response = await axios.get<IResPagination<IRoleItem>>(`${PATH}${search}`);
  return response.data;
};

const getDetail = async (seq: number) => {
  const response = await axios.get<{ role: IRoleForm }>(`${PATH}/${seq}`);
  return response.data.role;
};

const create = async (data: IRoleForm) => {
  const response = await axios.post<IRoleForm>(`${PATH}`, data);
  return response.data;
};

const update = async (seq: number, data: IRoleForm) => {
  const response = await axios.put<IRoleForm>(`${PATH}/${seq}`, data);
  return response.data;
};

const remove = async (seq: number) => {
  const response = await axios.delete(`${PATH}/${seq}`);
  return response.data;
};

export const roleRequests = { getList, getDetail, create, update, remove };
