import { RequestResult } from "@/models/RequestResult";

export const apiRequest = async (url, options = {}) => {
  const { method = "GET", headers = {}, body } = options;
  const requestResult = new RequestResult();
  try {
    const fetchResult = await fetch(url, options);
    requestResult.result = await fetchResult.json();
  } catch (err) {
    requestResult.error = err;
  }

  return requestResult;
};
