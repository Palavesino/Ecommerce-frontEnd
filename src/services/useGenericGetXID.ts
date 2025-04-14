import { useEffect, useState } from "react";

export const useGenericGetXID = <T>(
  endpoint: string,
  id: number,
  refetch?: boolean
) => {
  const [data, setData] = useState<T>({} as T);

  useEffect(() => {
    fetchData();
  }, [refetch]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error(`❌ Error al obtener datos:`, response.status);
      }
    } catch (e) {
      console.error(`❌ Error al obtener datos:`, e);
    } 
  };

  return data;
};
