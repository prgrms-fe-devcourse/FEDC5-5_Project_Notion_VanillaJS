export const getChangedTitle = (fetchRoot) => {
  window.addEventListener("change-title", (e) => {
    const { nextTitle } = e.detail;
    if (nextTitle) {
      fetchRoot();
      console.log("nextTitle", nextTitle);
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
}; //Editor에서 실행되는거고
