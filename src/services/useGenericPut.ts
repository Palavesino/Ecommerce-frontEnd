import { toast } from "react-toastify";
export const useGenericPut = () => {
  const genericPut = async <T>(endpoint: string, id: number, obj: T) => {
    try {

      const response = await fetch(`${endpoint}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      if (response.ok) {
        toast.success(`😎 Editado Exitosamente!`, {
          position: "top-center",
        });
      } else {
        console.error("Error updating entity:", response.status);
      }
    } catch (error) {
      toast.error(`Ha ocurrido un error: ${error}`, {
        position: "top-center",
      });
    }
  };

  return genericPut;
};
