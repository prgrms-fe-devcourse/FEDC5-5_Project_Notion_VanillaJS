export let pageAll = [];

export const initPageAll = (initialState) => {
  pageAll = [];
  let pageStack = [];
  for (const state of initialState) {
    pageStack.push(state);
  }
  while (pageStack.length > 0) {
    const nextPage = pageStack.pop();
    pageAll.push([nextPage.id, nextPage.title]);
    for (const sub of nextPage.documents) {
      pageStack.push(sub);
    }
  }
};
