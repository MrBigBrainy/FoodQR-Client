import api from "./axios";

export async function getStoreMenu(storeId) {
    return api.get(`/store/${storeId}/menu`);
}

export async function getStoreCategory(storeId) {
    return api.get(`/store/${storeId}/category`);
}

export async function getStoreById(storeId) {
    return api.get(`/store/${storeId}`);
}
