import { API_URL } from "../environment";

// utils / ApiService.js;
const getHeaders = (customHeaders = {}) => {
  const token = localStorage.getItem("token"); // placeholder for future use
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  return {
    "Content-Type": "application/json",
    ...authHeader,
    ...customHeaders,
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error ${response.status}: ${error}`);
  }
  return response.json();
};

export const ApiService = {
  get: async (endpoint, params = {}, customHeaders = {}) => {
    const url = new URL(`${API_URL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    );

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: getHeaders(customHeaders),
    });

    return handleResponse(response);
  },

  post: async (endpoint, data = {}, customHeaders = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: getHeaders(customHeaders),
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  put: async (endpoint, data = {}, customHeaders = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: getHeaders(customHeaders),
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  delete: async (endpoint, customHeaders = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers: getHeaders(customHeaders),
    });

    return handleResponse(response);
  },
};

export const api = async (endpoint, method = "GET", body) => {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) options.body = JSON.stringify(body);
  
  const response = await fetch(`${API_URL}${endpoint}`, options);
  
  // console.log("response", response);
  
  const data = await response.json();
  // console.log("data", data);

  return data;
};

