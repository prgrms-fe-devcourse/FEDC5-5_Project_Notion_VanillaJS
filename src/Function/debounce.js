export default function debounce(func, delay) {
  let timer = null;

  return function () {
    const context = this;
    const argument = arguments;

    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, argument);
    }, delay);
  };
}
