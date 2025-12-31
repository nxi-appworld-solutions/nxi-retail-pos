/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { API_URL } from "../environment";

const endpoints = {
  countries: { method: "GET", url: "/GetCountries/countries" },
  states: { method: "POST", url: "/GetStates/states" },
  cities: { method: "POST", url: "/GetCities/cities" },
};

const useLocationData = (type, params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!type || !endpoints[type]) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const { method, url } = endpoints[type];
        let res;

        if (method === "GET") {
          res = await fetch(`${API_URL}${url}`);
        } else {
          res = await fetch(`${API_URL}${url}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
          });
        }

        // console.log("res", res);
        const json = await res.json();
        // console.log(`${type} response:`, json);

        // updated here
        setData(json?.data ?? json);
      } catch (error) {
        console.error(`Failed to fetch ${type}:`, error);
        setError(error.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    // Fetch only when required fields are present
    if (
      (type === "states" && params.country) ||
      (type === "cities" && params.country && params.state) ||
      type === "countries"
    ) {
      fetchData();
    }
  }, [type, JSON.stringify(params)]);

  return { data, loading, error };
};

export default useLocationData;
