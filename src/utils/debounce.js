export const debounce = (callback, delay) => {
  let timer = null;

  return (...args) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => callback(...args), delay);
  };
};
