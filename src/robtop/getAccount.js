import { gdRequest } from "@/helpers/request-helper.js";
import responseToObj from '@/helpers/responseToObj.js';
import Account from "@/models/Account";

export const getAccountByID = async(targetAccountID) => {
    if (typeof targetAccountID != 'number') throw new Error("Se esperaba un id numerico");
    try {
        const body = await gdRequest("getGJUserInfo20", {targetAccountID});
        return new Account({timestamp: (new Date()).getTime(), ...responseToObj(body, ":")});
    } catch (err) {
        return -1;
    }
}

export const getAccount = async(target) => {
    try {
        const body = await gdRequest("getGJUsers20", {str: target});
        let accountID = parseInt(responseToObj(body, ":")[16]); // AccountID
        return await getAccountByID(accountID);
    } catch (err) {
        return -1;
    }
}