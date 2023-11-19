export const getChangedTitle = (fetchRoot) => {
  window.addEventListener("change-title", (e) => {
    const { nextTitle } = e.detail;
    if (nextTitle) {
      fetchRoot();
    }
  });
};

export const changeRootTitle = (state) => {
  window.dispatchEvent(
    new CustomEvent("change-title", {
      detail: {
        nextTitle: state,
      },
    })
  );
};
