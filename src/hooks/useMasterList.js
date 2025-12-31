import { useEffect, useState } from "react";
import { API_URL } from "../environment";

export const useMasterList = (type) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/GetMasterListByType/masters?tranType=1&masterType=${type}`
      );
      const result = await res.json();
      console.log("Fetched master list:", result);

      if (Array.isArray(result?.data)) {
        // const formatted = result.data.map((item) => ({
        //   value: item.value,
        //   label: item.label,
        // }));
        setList(result?.data);
      }
    } catch (err) {
      console.error("Error fetching master list", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { list, loading, refetch: fetchList };
};
