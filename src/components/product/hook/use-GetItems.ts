
export const useGetItems = () => {
    const baseURL = import.meta.env.VITE_BACK_DOMAIN;
    const getItems = async () => {
        try {
            const response = await fetch(`${baseURL}/api/product`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error(`Error fetching data:`, response.status);
            }
        } catch (error) {
            console.error("Error Get Items from BD = ", error);

        }
    }
    return getItems;
}
