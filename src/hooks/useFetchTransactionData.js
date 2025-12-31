/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, useCallback } from "react";
import { API_URL } from "../environment";

const API_ENDPOINTS = {
  vchNo: { method: "GET", url: "/GetVchNo/transactions?tranType=1&vchType=2" },
  customer: {
    method: "GET",
    url: "/GetMasterListByType/masters?tranType=1&masterType=2",
  },
  matCenter: {
    method: "GET",
    url: "/GetMasterListByType/masters?tranType=1&masterType=11",
  },
  stType: {
    method: "GET",
    url: "/GetMasterListByType/masters",
  },

  // 🔹 Transaction Endpoints (generic)
  tableData: { method: "GET", url: "/GetTransactionsDet/transactions" },
  saveTransaction: {
    method: "POST",
    url: "/SaveOrUpdateTransactionDet/transactions",
  },
};

const buildQuery = (params) =>
  params && Object.keys(params).length ? "?" + new URLSearchParams(params) : "";

/**
 * useTransactionApi - universal fetch/save hook
 *
 * @param {string} type - API_ENDPOINTS key
 * @param {object} params - query params (for GET)
 * @param {object} options - { enabled?: boolean, cache?: boolean, transform?: fn }
 */
export default function useTransactionApi(
  type,
  params = {},
  { cache = true, enabled = false, transform } = {}
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cacheRef = useRef({});

  const fetchData = useCallback(
    async (body = null, overrideType = null, force = false) => {
      const endpoint = API_ENDPOINTS[overrideType || type];
      if (!endpoint)
        throw new Error(`Unknown API type: ${overrideType || type}`);

      const key = `${type}-${JSON.stringify(params)}-${JSON.stringify(body)}`;

      if (!force && cache && cacheRef.current[key]) {
        setData(cacheRef.current[key]);
        return cacheRef.current[key];
      }

      setLoading(true);
      setError(null);
      // console.log("F", `${API_URL}${endpoint.url}${buildQuery(params)}`);

      try {
        // const res = await fetch(
        //   `${API_URL}${endpoint?.url}${buildQuery(params)}`,
        //   {
        //     method: endpoint?.method,
        //     headers: { "Content-Type": "application/json" },
        //     body: body ? JSON.stringify(body) : null,
        //   }
        // );

        const options = {
          method: endpoint.method,
          headers: { "Content-Type": "application/json" },
        };

        // Only attach body if method is not GET
        if (endpoint.method !== "GET" && body) {
          options.body = JSON.stringify(body);
        }

        const res = await fetch(
          `${API_URL}${endpoint.url}${buildQuery(params)}`,
          options
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        let result = await res.json();
        if (transform) result = transform(result);
        console.log("G", result);

        setData(result);
        if (cache) cacheRef.current[key] = result;
        return result;
      } catch (err) {
        setError(err?.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [type, JSON.stringify(params)]
  );

  useEffect(() => {
    if (enabled) fetchData();
  }, [enabled, fetchData]);

  return { data, loading, error, fetchData };
}
