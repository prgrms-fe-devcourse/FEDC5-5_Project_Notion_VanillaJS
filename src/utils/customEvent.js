export const customSideBarList = (handleCustomEvent) => {
  //handleCustomEvent : await sideBar.setState();

  window.addEventListener("render-SideBarList", async (e) => {
    await handleCustomEvent();
  });
};
