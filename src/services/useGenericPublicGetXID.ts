import { useEffect, useState } from "react";
import { useSpinner } from "../context/SpinnerContext";
export const useGenericPublicGetXID = <T>(
  endpoint: string,
  id: string,
  refetch?: boolean
) => {
  const [data, setData] = useState<T>({} as T);
  const baseURL = import.meta.env.VITE_BACK_DOMAIN;
  const { showSpinner, hideSpinner } = useSpinner();

  useEffect(() => {
    fetchData();
  }, [refetch]);

  const fetchData = async () => {
    showSpinner();
    try {
      const response = await fetch(`${baseURL}${endpoint}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error(`Error fetching data:`, response.status);
      }
    } catch (e) {
      console.error(`Error fetching data:`, e);
    } finally {
      hideSpinner();
    }
  };

  return data;
};
