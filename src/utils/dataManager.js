// 데이터 관리를 위한 함수들을 정의합니다.

// api get 요청으로 받은 트리구조 Documents 데이터에서 id를 통해 해당 Document를 찾아 반환합니다.
// dfs
export function findDocumentFromTree(documents, id) {
  // deep copy 를 수행
  const copiedDocuments = JSON.parse(JSON.stringify(documents));

  let result = copiedDocuments.find((item) => item.id === Number(id));
  if (result) {
    return result;
  }
  copiedDocuments.forEach((item) => {
    if (item.documents && item.documents.length > 0) {
      result = findDocumentFromTree(item.documents, id);
    }
  });
  return result;
}

// api get 요청으로 받은 트리구조 Documents 데이터를 callback 함수를 통해 수정합니다.
// dfs
export function updateDocumentToTree(documents, id, data, documentItemChange) {
  // deep copy 를 수행
  const copiedDocuments = JSON.parse(JSON.stringify(documents));

  // id 가 null 인 경우는 root 를 수정하는 경우입니다. 이때는 그냥 추가해주면 됩니다.
  if (id === "null") {
    copiedDocuments.push(data);
    return copiedDocuments;
  }

  copiedDocuments.forEach((item) => {
    if (item.id === Number(id)) {
      documentItemChange(item, data);
      return copiedDocuments;
    } else if (item.documents && item.documents.length > 0) {
      const children = updateDocumentToTree(
        item.documents,
        id,
        data,
        documentItemChange
      );
      if (children) {
        item.documents = children;
      }
    }
  });
  return copiedDocuments;
}

export function updatePostToSideBar(sideBarData, postData) {
  const copiedSideBarData = JSON.parse(JSON.stringify(sideBarData));
  const resultData = updateDocumentToTree(
    copiedSideBarData,
    postData.id,
    postData,
    (item, data) => {
      item.title = data.title;
    }
  );
  return resultData;
}

// updateDocumentToTree 함수를 이용한 인터페이스 함수입니다. 트리 구조인 sideBarData 에서 parentId 를 통해 해당 데이터를 찾아 수정합니다.
export function appendPostToSideBar(sideBarData, postData, parentId) {
  // postData 의 documents 를 초기화 합니다.st copiedSideBarData = JSON.parse(JSON.stringify(sideBarData));
  const copiedSideBarData = JSON.parse(JSON.stringify(sideBarData));
  const resultData = updateDocumentToTree(
    copiedSideBarData,
    parentId,
    postData,
    (item, data) => {
      item.documents.push(data);
    }
  );

  return resultData;
}

// 트리 구조인 sideBarData 를 flat 하게 만들어줍니다.
export const flatSideBarData = (sideBarData) => {
  const result = [];
  sideBarData.forEach((item) => {
    result.push({
      id: item.id,
      title: item.title,
    });
    if (item.documents && item.documents.length > 0) {
      result.push(...flatSideBarData(item.documents));
    }
  });
  return result;
};

export const getIDs = (sideBarData) => {
  const result = [];
  sideBarData.forEach((item) => {
    result.push(item.id);
    if (item.documents && item.documents.length > 0) {
      result.push(...getIDs(item.documents));
    }
  });
  return result;
};

// 트리 구조인 sideBarData 를 html 로 만들어줍니다.
export function documentTreeToHTML(sideBarData) {
  const result = sideBarData.map((item) => {
    let HtmlResult = `<div><li id=${item.id}>${item.title}</li><button id=${item.id}>+</button></div>`;
    if (item.documents && item.documents.length > 0) {
      HtmlResult += "<ul>" + documentTreeToHTML(item.documents) + "</ul>";
    }
    return HtmlResult;
  });

  return "<ul>" + result.join("") + "</ul>";
}
