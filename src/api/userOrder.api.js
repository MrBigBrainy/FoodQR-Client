import api from "./axios";

export async function getUserOrderByOrderId({ orderId }) {
    return api.get(`/userOrder/${orderId}`);
}