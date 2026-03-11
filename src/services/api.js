const BASE_URL = import.meta.env.VITE_API_URL;

export const getRestaurants = () => fetch(`${BASE_URL}/restaurants`).then(r => r.json());
export const getDishes = () => fetch(`${BASE_URL}/dishes`).then(r => r.json());
export const getOrders = () => fetch(`${BASE_URL}/orders`).then(r => r.json());
export const getCustomers = () => fetch(`${BASE_URL}/customers`).then(r => r.json());
export const getOrderDishes = (id) => fetch(`${BASE_URL}/order/${id}/dishes`).then(r => r.json());

