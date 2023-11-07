export const debounce = (callbackFunc, delay) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callbackFunc(...args);
    }, delay);
  };
};
