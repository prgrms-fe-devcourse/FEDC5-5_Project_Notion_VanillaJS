export const isObject = (value: unknown): value is Record<string, unknown> => {
  return (typeof value === "object" || typeof value === "function") && value !== null;
};

export const deepEqual = (first: unknown, second: unknown): boolean => {
  if (!isObject(first) || !isObject(second)) {
    return first === second;
  }

  const firstKeys = Object.keys(first);
  const secondKeys = Object.keys(second);

  if (firstKeys.length !== secondKeys.length) {
    return false;
  }

  for (const key of firstKeys) {
    if (!secondKeys.includes(key) || !deepEqual(first[key], second[key])) {
      return false;
    }
  }

  return true;
};
