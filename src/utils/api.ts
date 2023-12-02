export const throwError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error);

    throw new Error(error.message);
  }
};
