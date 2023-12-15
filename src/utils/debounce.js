let timer = null;

export const debounce = (callback, delay) => {
  if (timer !== null) {
    clearTimeout(timer);
  }

  timer = setTimeout(callback, delay); 
}