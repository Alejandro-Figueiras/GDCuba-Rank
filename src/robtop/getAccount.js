import { gdRequest } from "@/helpers/request-helper.js";
import responseToObj from '@/helpers/responseToObj.js';
import Account from "@/models/Account";

/**
 * Hace una request a los servidores de RobTop usando la id y devuelve un objeto Account con los datos obtenidos
 * 
 * Si no hay resultados devuelve -1
 * @async
 * @param {Number} targetAccountID 
 * @returns {Account | -1}
 */
export const getAccountByID = async(targetAccountID) => {
    if (typeof targetAccountID != 'number') throw new Error("Se esperaba un id numerico");
    try {
        const body = await gdRequest("getGJUserInfo20", {
            targetAccountID
        });
        return new Account({timestamp: (new Date()).getTime(), ...responseToObj(body, ":")});
    } catch (err) {
        return -1;
    }
}

/**
 * Hace una request a los servidores de RobTop usando el usuario, luego hace otra con la id para obtener los datos completos, y posteriormente devuelve un objeto Account con los datos obtenidos
 * 
 * Si no hay resultados devuelve -1
 * 
 * **IMPORTANTE:** Siempre que sea posible usar la función `getAccountByID`
 * @async
 * @param {String} target Nombre del usuario objetivo
 * @returns {Account | -1}
 */
export const getAccount = async(target) => {
    try {
        const body = await gdRequest("getGJUsers20", {str: target});
        let accountid = parseInt(responseToObj(body, ":")[16]); // AccountID
        return await getAccountByID(accountid);
    } catch (err) {
        return -1;
    }
}