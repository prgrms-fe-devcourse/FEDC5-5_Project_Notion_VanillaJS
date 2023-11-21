export const assert = (assertion, message = "에러가 발생했습니다.") => {
  if (assertion === false) {
    throw new Error(message);
  }
};
