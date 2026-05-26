import { IResPagination } from "@src/models";
import { IEmployeeForm, IEmployeeItem } from "@src/models/employee";
import axios from "@src/requests";

const PATH = "/users";

const getList = async (search: string) => {
  const response = await axios.get<IResPagination<IEmployeeItem>>(`${PATH}${search}`);
  return response.data;
};

const getDetail = async (seq: number) => {
  const response = await axios.get<IEmployeeItem>(`${PATH}/${seq}`);
  return response.data;
};

const create = async (data: IEmployeeForm) => {
  const response = await axios.post<IEmployeeForm>(`${PATH}`, data);
  return response.data;
};

const update = async (seq: number, data: IEmployeeForm) => {
  const response = await axios.put<IEmployeeForm>(`${PATH}/${seq}`, data);
  return response.data;
};

const remove = async (seq: number) => {
  const response = await axios.delete<IEmployeeForm>(`${PATH}/${seq}`);
  return response.data;
};

export const employeeRequests = { getList, getDetail, create, update, remove };
