export const debounce = (callback, delay = 500) => {
    let timer = null;
  
    return (...args) => {
        if (timer !== null) {
            clearTimeout(timer);
        }
  
        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    };
};