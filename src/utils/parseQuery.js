/**
 * @deprecated
 */
export const parseQuery = (queryString) => {
  return queryString
    .substring(1)
    .split("&")
    .reduce((acc, curr) => {
      const [key, value] = curr.split("=");
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {});
};
 