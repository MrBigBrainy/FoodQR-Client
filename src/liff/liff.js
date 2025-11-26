import liff from "@line/liff";


export const initLiff = async () => {
    const liffId = "2008556874-G43oa4Nq"
    try {
        await liff.init({ liffId });
        console.log("LIFF init success");

        if (!liff.isLoggedIn()) {
            liff.login();
        }
    } catch (err) {
        console.error("LIFF init failed", err);
    }
};

export const getProfile = async () => {
    if (!liff.isLoggedIn()) return null;
    return await liff.getProfile();
};