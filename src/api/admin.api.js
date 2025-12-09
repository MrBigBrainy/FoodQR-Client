import api from "./axios";

export async function getSaleToday() {
    return api.get(`/admin/salesToday`);
}

// Table Type APIs
export async function getTableTypes(storeId) {
    return api.get(`/admin/table-types`)
    // return api.get(`/admin/table-types?storeId=${storeId}`)

}

export async function createTableType(data) {
    return api.post(`/admin/table-types`, data);
}

// Table APIs
export async function getTables(storeId) {
    return api.get(`/admin/tables?storeId=${storeId}`);
}

export async function getAllTables() {
    return api.get(`/admin/tables`);
}

export async function createTable(data) {
    return api.post(`/admin/tables`, data);
}

export async function updateTable(tableId, data) {
    return api.put(`/admin/tables/${tableId}`, data);
}

export async function deleteTable(tableId) {
    return api.delete(`/admin/tables/${tableId}`);
}

// Zone APIs
export async function getZones(storeId) {
    return api.get(`/admin/zones?storeId=${storeId}`);
}

