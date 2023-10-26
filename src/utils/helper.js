// 토글을 위해 map을 만들어서 true/false 관리
export const toggleDocument = (documents) => {
  const isOpen = {};

  documents.forEach((document) => {
    if (!isOpen.hasOwnProperty(+document.id)) {
      isOpen[+document.id] = false;

      if (Array.isArray(document.documents) && document.documents.length > 0) {
        document.documents.map((doc) => {
          if (!isOpen.hasOwnProperty(+doc.id)) {
            isOpen[+doc.id] = false;
          }
        });
      }
    }
  });
  return isOpen;
};

// 값이 같은 경우 렌더링 방지 하기 위해 사용
export const isEqual = (objA, objB) => {
  return JSON.stringify(objA) === JSON.stringify(objB);
};
