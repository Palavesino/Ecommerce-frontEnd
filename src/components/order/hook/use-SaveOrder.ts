import { toast } from "react-toastify";
import { useSpinner } from "../../../context/SpinnerContext";
import { Order } from "../../../interface/Order";

export const useOrderSave = () => {
    const baseURL = import.meta.env.VITE_BACK_DOMAIN;
    const { showSpinner, hideSpinner } = useSpinner();
    const orderSave = async (obj: Order) => {
        showSpinner();
        try { // ${baseURL}/api/order
            const response = await fetch(`${baseURL}/api/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });

            if (!response.ok) {
                throw new Error(`Error al Guardar Orden: ${response.status}`);
            }
            toast.success("😎 Orden Generada Exitosamente!", { position: "top-center" });
            if (obj.paymentType !== 'mp') {
                return null;
            }
            return await response.json();
        } catch (error) {
            toast.error(`Error al crear Order`, {
                position: "top-center",
            });
            return null;
        } finally {
            hideSpinner();
        }
    };
    return orderSave;
};


