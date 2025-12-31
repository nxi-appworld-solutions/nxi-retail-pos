import { API_URL } from "../environment";
import { api } from "./api";

export const searchProducts = async (query) => {
  if (!query) return [];
  const res = await fetch(
    `${API_URL}/SearchProducts/search?tranType=1&masterType=6`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: query }),
    }
  );
  const result = await res.json();
  // console.log("ram", result);
  return result?.data || [];
};

export const getProductDetail = async (productCode) => {
  const res = await fetch(`${API_URL}/GetProductMasterDetails/6?code=${productCode}`);
  const result = await res.json();
  // console.log("tyfffffffffffffff", result?.data);
  return result?.data || [];
};

export const login = async (username, password) => {
  return await api("/Login/login", "POST", { username, password });
};

export const getVchNo = async (vchType) =>{
  const query = new URLSearchParams({ vchType }).toString();
  return await api(`/GetVchNo/transactions?${query}`, "GET");
}

export const refreshToken = async (refreshToken) => {
  return await api("/QSRAPI/RefreshToken", "POST", { refreshToken });
};

export const signup = async (user) => {
  return await api("/QSRAPI/Signup", "POST", user);
};

export const invoiceReport = async ( vchType, startDate, endDate, customer, status) => {
  const query = new URLSearchParams({ vchType, startDate, endDate, customer, status}).toString();
  return await api(`/GetTransactionsReport/transactions/report?${query}`, "GET" );
};

export const invoiceReportSummary = async (vchType, startDate, endDate, customer, status) => {
  const query = new URLSearchParams({vchType, startDate, endDate, customer, status}).toString();
  return await api(`/GetTransactionsReportDet/report?${query}`, "GET");
  // params: { vchType, startDate, endDate, customer, status },
};

export const dashboardCardSummary = async () => {
  // const query = new URLSearchParams({}).toString();
  return await api(`/GetCardSummary/dashboard/card-summary`, "GET");
};

export const dashboardSalePurchaseDayChart = async (range = "1Y") => {
  // console.log("range", range);
  const query = new URLSearchParams({ range }).toString();
  return await api(`/GetSalesPurchaseDayChart/dashboard/day-chart?${query}`, "GET");
};

export const dashboardRecentTransactions = async () => {
  return await api(`/GetRecentTransactions/dashboard/recent-transactions`, "GET");
};

export const posCategoriesWithItems = async (tranType = 0) => {
  const query = new URLSearchParams({ tranType }).toString();
  return await api(`/GetCategoriesWithProducts/categories-with-products?${query}`, "GET");
};