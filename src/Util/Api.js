import { setCustomEvent } from "./Router.js";

const API_URL = "https://kdt-frontend.programmers.co.kr/documents";

export const HTTPRequest = async (url, payload = {}) => {
  try {
    const res = await fetch(`${API_URL}${url}`, {
      ...payload,
      headers: {
        "Content-Type": "application/json",
        "x-username": "choi-ik",
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error(
      `${API_URL}${url} \n요청 하신 주소가 존재하지 않습니다. 루트 화면으로 돌아갑니다.`
    );
  } catch (error) {
    alert(error.message);
    setCustomEvent("/");
  }
};
