export const parseToQueryString = (params) => {
  const queryString = new URLSearchParams(params).toString();

  return queryString ? `?${queryString}` : '';
};
