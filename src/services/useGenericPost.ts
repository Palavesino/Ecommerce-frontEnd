import { toast } from "react-toastify";

export const useGenericPost = () => {

  const genericPost = async <T>(endpoint: string, obj?: T) => {
    try {

      const response = await fetch(`${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      if (response.ok) {
        toast.success(`😎 Insertado Exitosamente!`, {
          position: "top-center",
        });
      } else {
        toast.error(`❌ Error al insertar: ${response.statusText}`, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(`❌ Ha ocurrido un error: ${error}`, {
        position: "top-center",
      });
    } 
  };

  return genericPost;
};
