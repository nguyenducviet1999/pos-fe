import { IResPagination } from "@src/models";
import { IPaymentMethodForm, IPaymentMethodItem } from "@src/models/payment-method";
import axios from "@src/requests";

const PATH = "/payment-methods";

const getList = async (search: string) => {
  const response = await axios.get<IResPagination<IPaymentMethodItem>>(`${PATH}${search}`);
  return response.data;
};

const getDetail = async (seq: number) => {
  const response = await axios.get<{ paymentMethod: IPaymentMethodForm }>(`${PATH}/${seq}`);
  return response.data.paymentMethod;
};

const create = async (data: IPaymentMethodForm) => {
  const response = await axios.post<IPaymentMethodForm>(`${PATH}`, data);
  return response.data;
};

const update = async (seq: number, data: IPaymentMethodForm) => {
  const response = await axios.put<IPaymentMethodForm>(`${PATH}/${seq}`, data);
  return response.data;
};

const remove = async (seq: number) => {
  const response = await axios.delete(`${PATH}/${seq}`);
  return response.data;
};

export const paymentMethodRequests = { getList, getDetail, create, update, remove };
