import { useEffect, useState } from "react";

export const useGenericGet = <T>(
  endpoint: string,
  entidadMsj: string,
  refetch?: boolean
) => {

  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    fetchData();
  }, [refetch]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${endpoint}`, {
        method: "GET",

      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error(`Error fetching ${entidadMsj} data:`, response.status);
      }
    } catch (e) {
      console.error(`Error fetching ${entidadMsj} data:`, e);
    } 
  };

  return data;
};
