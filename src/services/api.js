const BASE_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (r) => {
    if (!r.ok) {
        throw new Error(`HTTP Error: ${r.status} ${r.statusText}`);
    }
    return r.json();
};

export const getRestaurants = () => fetch(`${BASE_URL}/restaurants`).then(handleResponse);
export const getDishes = () => fetch(`${BASE_URL}/dishes`).then(handleResponse);
export const getOrders = () => fetch(`${BASE_URL}/orders`).then(handleResponse);
export const getCustomers = () => fetch(`${BASE_URL}/customers`).then(handleResponse);
