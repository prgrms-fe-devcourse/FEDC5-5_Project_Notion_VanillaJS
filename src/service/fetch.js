import { BASE_URL, HTTP_METHOD } from "./api.js";
import { assert } from "../utils/assert.js";

export const fetchAPI = async (
  endpoint,
  method = HTTP_METHOD.GET,
  data = null
) => {
  try {
    const options = {
      headers: {
        "x-username": "pysoo",
      },
      method,
    };

    if ((method === HTTP_METHOD.POST || method === HTTP_METHOD.PUT) && data) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }

    const response = await fetch(BASE_URL + endpoint, options);
    const { ok } = response;

    assert(ok, "API 호출을 실패했습니다.");

    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
};
