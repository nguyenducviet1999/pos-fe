import { EnumQuoterStatus } from "@src/enums/quoter.enum";
import { IQuoteItem, IResPagination } from "@src/models";
import axios from "@src/requests";

const PATH = "/quotations";

const getListCompleted = async (search: string) => {
  const response = await axios.get<IResPagination<IQuoteItem>>(`${PATH}${search}&status=${EnumQuoterStatus.COMPLETED}`);
  return response.data;
};

const getListPending = async (search: string) => {
  const response = await axios.get<IResPagination<IQuoteItem>>(`${PATH}${search}&status=${EnumQuoterStatus.DRAFT}`);
  return response.data;
};

const create = async (data: any) => {
  const response = await axios.post<any>(`${PATH}`, data);
  return response.data.quotation;
};

const getDetail = async (id: string) => {
  const response = await axios.get<any>(`${PATH}/${id}`);
  return response.data.quotation;
};

const update = async (id: any, data: any) => {
  const response = await axios.put<any>(`${PATH}/${id}`, data);
  return response.data.quotation;
};

const updateNote = async (id: number, note: string) => {
  const response = await axios.post<any>(`${PATH}/${id}/note`, { note });
  return response.data;
};

const getTotal = async () => {
  const response = await axios.get<any>(`${PATH}/stats/count`);
  return response.data;
};

const remove = async (id: number) => {
  const response = await axios.delete<any>(`${PATH}/${id}`);
  return response.data;
};

export const quoteRequests = { getListCompleted, getListPending, create, update, getDetail, updateNote, getTotal, remove };