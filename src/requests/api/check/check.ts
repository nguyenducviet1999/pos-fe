import {
  ICheckValue,
  IResPagination,
  IResStatisticByEmployee,
  IResStatisticByPaymentMethod,
  IResStatisticByService,
  IResStatisticByTip,
  IServiceStatisticItem,
} from "@src/models";
import axios from "@src/requests";

const PATH = "/statistics";
const PATH_RECONCILIATIONS = "/reconciliations";

const getByEmployee = async (search: string) => {
  const response = await axios.get<IResPagination<IResStatisticByEmployee>>(`${PATH}/technicians${search}`);
  return response.data;
};

const getByEmployeeDiscount = async (search: string) => {
  const response = await axios.get<IResPagination<IResStatisticByEmployee>>(`${PATH}/technicians${search}`, {
    params: {
      discount: true,
    },
  });
  return response.data;
};

const getByPaymentMethod = async (search: string) => {
  const response = await axios.get<IResPagination<IResStatisticByPaymentMethod>>(`${PATH}/payment-methods${search}`);
  return response.data;
};

const getByTip = async (search: string) => {
  const response = await axios.get<IResPagination<IResStatisticByTip>>(`${PATH}/tips${search}`);
  return response.data;
};

const getServiceStatistics = async (search: string) => {
  const response = await axios.get<IResPagination<IResStatisticByService>>(`${PATH}/services${search}`);
  return response.data;
};

// ============ reconciliations =========== //

const createReconciliation = async (data: ICheckValue) => {
  const response = await axios.post<{ reconciliation: ICheckValue }>(`${PATH_RECONCILIATIONS}`, data);
  return response.data.reconciliation;
};

const updateReconciliation = async (id: number, data: ICheckValue) => {
  const response = await axios.put<{ reconciliation: ICheckValue }>(`${PATH_RECONCILIATIONS}/${id}`, data);
  return response.data.reconciliation;
};

const getReconciliation = async (id: number) => {
  const response = await axios.get<{ reconciliation: ICheckValue }>(`${PATH_RECONCILIATIONS}/${id}`);
  return response.data.reconciliation;
};
const deleteReconciliation = async (id: number) => {
  const response = await axios.delete(`${PATH_RECONCILIATIONS}/${id}`);
  return response.data;
};

// ============ export =========== //

const exportStaisticDetail = async (search: string) => {
  const response = await axios.get<{
    downloadUrl: string;
    fileName: string;
  }>(`${PATH}/export/detail${search}`);
  return response.data;
};

const exportStaisticDate = async (search: string) => {
  const response = await axios.get<{
    downloadUrl: string;
    fileName: string;
  }>(`${PATH}/export${search}`);
  return response.data;
};

const exportStaisticSummary = async (search: string) => {
  const response = await axios.get<{
    downloadUrl: string;
    fileName: string;
  }>(`${PATH}/export/compact${search}`);
  return response.data;
};

export const checkRequests = {
  getByEmployee,
  getByEmployeeDiscount,
  getByPaymentMethod,
  getByTip,
  getServiceStatistics,
  createReconciliation,
  updateReconciliation,
  getReconciliation,
  deleteReconciliation,
  exportStaisticDetail,
  exportStaisticDate,
  exportStaisticSummary,
};
