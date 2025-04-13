import { toast } from "react-toastify";

export const useGenericChangeStatus = () => {


  const updateEntityStatus = async (id: number, endpoint: string) => {
    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "PUT",
      });

      if (response.ok) {
        toast.success(`😎 Estado Actualizado Exitosamente!`, {
          position: "top-center",
        });
      } else {
        toast.error(`❌ Error al actualizar el estado: ${response.statusText}`, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(`❌ Ha ocurrido un error: ${error}`, {
        position: "top-center",
      });
    }
  };

  return updateEntityStatus;
};
