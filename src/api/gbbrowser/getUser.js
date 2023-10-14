import { gdBrowserAPI } from "../../config/api.config.js";
import { RequestResult } from "../../models/RequestResult.js";

export const getUser = async (name) => {
  const requestResult = new RequestResult({result:[], error:undefined});

  try {
    const result = await fetch(gdBrowserAPI.base);
    const data = result.json();

    requestResult.result = data;
  } catch (err) {
    requestResult.error = err;
  }

  return requestResult;

};
