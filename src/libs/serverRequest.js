import { RequestResult } from "@/models/RequestResult";

export const apiRequest = async (url, options = {}) => {
  const { method = "GET", headers = {}, body } = options;
  const requestResult = new RequestResult();
  try {
    const fetchResult = await fetch(url, options);
    const fetchData = await fetchResult.json();
    if (fetchResult.status >= 400) {
      throw new Error(fetchData.error);
    }
    requestResult.result = fetchData
  } catch (err) {
    requestResult.error = err;
  }

  return requestResult;
};
