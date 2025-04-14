
export const useGetItems = () => {
    const getItems = async () => {
        try {
            const response = await fetch(`/api/product`, {
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
