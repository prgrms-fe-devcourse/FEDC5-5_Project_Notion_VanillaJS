export const X_USERNAME = "bel1c10ud";

export const API_ENDPOINT = "https://kdt-frontend.programmers.co.kr";

export const asyncDataObj = { isLoading: false, isError: false, data: null };

export const AsyncRequestEvent = {
  Start: new CustomEvent("async-request-start"),
  Finish: new CustomEvent("async-request-finish"),
  init: (callback) => {
    window.addEventListener("async-request-start", () => callback(true));
    window.addEventListener("async-request-finish", () => callback(false));
  },
};

export const request = async (url, options = {}) => {
  try {
    window.dispatchEvent(AsyncRequestEvent.Start);

    const res = await fetch(`${API_ENDPOINT}${url}`, {
      headers: {
        "Content-Type": "application/json",
        "x-username": X_USERNAME,
      },
      ...options,
    });

    if (res.ok) {
      window.dispatchEvent(AsyncRequestEvent.Finish);

      const json = await res.json();
      return json;
    }

    throw new Error("API 처리 실패!");
  } catch (e) {
    window.dispatchEvent(AsyncRequestEvent.Finish);

    alert(e);
  }
};
