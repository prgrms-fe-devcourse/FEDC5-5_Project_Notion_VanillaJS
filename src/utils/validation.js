export const validDocumentsArray = (documents) => {
  if (!Array.isArray(documents)) {
    throw new Error("documents가 배열이 아닙니다.");
  }

  documents.map(({ id, title }) => {
    if ((typeof id !== "number", typeof title !== "string")) {
      throw new Error(`document-${id} 값이 올바르지 않습니다.`);
    }
  });
};

export const validDocument = (document) => {
  const { title } = document;
  if (title === undefined || title === null) {
    throw new Error(`document 값이 올바르지 않습니다.`);
  }
};
