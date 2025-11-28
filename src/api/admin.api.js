import api from "./axios";

export async function getSaleToday() {
    return api.get(`/admin/salesToday`);
}

