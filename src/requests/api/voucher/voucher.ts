import { IResPagination } from "@src/models";
import { IVoucherForm, IVoucherHistoryItem, IVoucherItem, IVoucherStatisticItem } from "@src/models/voucher";
import axios from "@src/requests";

const PATH = "/vouchers";
const HISTORY_PATH = "/audit-logs";

const getList = async (search: string) => {
  const response = await axios.get<IResPagination<IVoucherItem>>(`${PATH}${search}`);
  return response.data;
};

const getDetail = async (seq: number) => {
  const response = await axios.get<{ voucher: IVoucherForm }>(`${PATH}/${seq}`);
  return response.data.voucher;
};

const create = async (data: IVoucherForm) => {
  const response = await axios.post<IVoucherForm>(`${PATH}`, data);
  return response.data;
};

const update = async (seq: number, data: IVoucherForm) => {
  const response = await axios.put<IVoucherForm>(`${PATH}/${seq}`, data);
  return response.data;
};

const remove = async (seq: number) => {
  const response = await axios.delete(`${PATH}/${seq}`);
  return response.data;
};

const validateVoucher = async (code: string, orderValue: number) => {
  const response = await axios.post<{
    calculatedDiscount: number;
    voucher: IVoucherForm;
  }>(`${PATH}/validate`, { code, orderValue });
  return response.data;
};

const generateVoucherCode = async () => {
  const response = await axios.post<{ code: string }>(`${PATH}/generate-code`, {
    prefix: "MIA",
    length: 5,
  });
  return response.data.code;
};

const getStatistics = async (code: string, search: string) => {
  const response = await axios.get<IResPagination<IVoucherStatisticItem>>(`${PATH}/${code}/usages${search}`);
  return response.data;
};

const getHistory = async (code?: string, search?: string) => {
  const response = await axios.get<IResPagination<IVoucherHistoryItem>>(`${HISTORY_PATH}${search}`, {
    params: { ref: code, type: "voucher" },
  });
  return response.data;
};

export const voucherRequests = { getList, getDetail, create, update, remove, validateVoucher, generateVoucherCode, getStatistics, getHistory };
