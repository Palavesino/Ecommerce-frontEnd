
export const useCreateMPPreference = () => {
  const baseURL = import.meta.env.VITE_BACK_DOMAIN;
  const createPreference = async (total: number): Promise<string | null> => {
    try {
      const res = await fetch(`${baseURL}/api/mercadopago/create-preference`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total,
        }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);

      const data = await res.json();

      if (!data.preferenceId) throw new Error("Sin preferenceId en respuesta");

      return data.preferenceId;
    } catch (e) {
      console.error("MP preference error:", e);
      return null;
    }
  };

  return { createPreference };
};