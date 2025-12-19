import api from "./axios";

// Menu APIs
export async function getMenu(storeId) {
    return api.get(`/store/${storeId}/menu`);
}

export async function createMenu(data) {
    return api.post(`/store/menu`, data);
}

export async function updateMenu(menuId, data) {
    return api.put(`/store/menu/${menuId}`, data);
}

export async function deleteMenu(menuId) {
    return api.delete(`/store/menu/${menuId}`);
}

