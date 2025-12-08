import api from "./axios";

export async function createOrder({storeId, customerCount, tableId}) {
    return api.post(`/order`, {storeId, customerCount, tableId});
}