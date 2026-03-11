const BASE_URL = 'http://localhost:4000';

export const getRestaurants = () => fetch(`${BASE_URL}/restaurants`).then(r => r.json());
export const getDishes = () => fetch(`${BASE_URL}/dishes`).then(r => r.json());
export const getOrders = () => fetch(`${BASE_URL}/orders`).then(r => r.json());
export const getCustomers = () => fetch(`${BASE_URL}/customers`).then(r => r.json());
export const getOrderDishes = (id) => fetch(`${BASE_URL}/order/${id}/dishes`).then(r => r.json());
