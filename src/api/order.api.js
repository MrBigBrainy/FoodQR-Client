import api from "./axios";

export async function createOrder({storeId, customerCount, tableId}) {
    return api.post(`/order`, {storeId, customerCount, tableId});
}

export async function updateOrder({orderId, status, subtotal, total}) {
    return api.patch(`/order/${orderId}`, {status, subtotal, total});
}
