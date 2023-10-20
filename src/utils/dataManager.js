export function findDocumentFromTree(data, id) {
  let result = data.find((item) => item.id === Number(id));
  if (result) {
    return result;
  }
  data.forEach((item) => {
    if (item.documents.length > 0) {
      result = findDocumentFromTree(item.documents, id);
    }
  });
  return result;
}

export function updateDocumentFromTree(documents, id, data, callback) {
  const copiedDocuments = JSON.parse(JSON.stringify(documents));
  if (id === "null") {
    copiedDocuments.push(data);
    return copiedDocuments;
  }
  copiedDocuments.forEach((item) => {
    if (item.id === Number(id)) {
      callback(item, data);
      return copiedDocuments;
    } else if (item.documents.length > 0) {
      const children = updateDocumentFromTree(
        item.documents,
        id,
        data,
        callback
      );
      if (children) {
        item.documents = children;
      }
    }
  });
  return copiedDocuments;
}
export function updateEditingPostToSideBar(sideBarData, editingPostData) {
  const copiedSideBarData = JSON.parse(JSON.stringify(sideBarData));
  const nextState = updateDocumentFromTree(
    copiedSideBarData,
    editingPostData.id,
    editingPostData,
    (item, data) => {
      item.title = data.title;
    }
  );
  return nextState;
}

export function appendEditingPostToSideBar(sideBarData, postData, parentId) {
  postData.documents = [];
  const copiedSideBarData = JSON.parse(JSON.stringify(sideBarData));
  const nextState = updateDocumentFromTree(
    copiedSideBarData,
    parentId,
    postData,
    (item, data) => {
      item.documents.push(data);
    }
  );

  return nextState;
}
