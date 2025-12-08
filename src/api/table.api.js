import api from "./axios";

export async function updateTableStatus({ storeId, tableId, status }) {
    console.log("STATUS", status)
    return api.patch(`/admin/tables/status`, {storeId, tableId, status});
}
