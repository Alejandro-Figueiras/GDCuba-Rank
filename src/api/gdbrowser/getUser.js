import { gdBrowserAPI } from "../../config/api.config.js";
import { log } from "../../libs/utils.js";
import RequestResult from "../../models/RequestResult.js";

export const getUser = async (name) => {
  const requestResult = new RequestResult({result:[], error:undefined});

  try {
    const result = await fetch(`${gdBrowserAPI.base}profile/${name}`);
    const data = result.json();
    log(data);

    requestResult.result = data;
  } catch (err) {
    requestResult.error = err;
  }

  return requestResult;

};
