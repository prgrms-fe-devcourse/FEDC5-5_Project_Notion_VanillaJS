export const findDocumentDataById = (rootDocument, id) => {
  const documentPath = [];
  const findDocument = (documents, id) => {
    for (const document of documents) {
      if (document.id === id) {
        documentPath.push({ title: document.title, id: document.id });
        return true;
      }
      if (document.documents.length > 0) {
        documentPath.push({ title: document.title, id: document.id });
        if (findDocument(document.documents, id)) return true;
        documentPath.pop();
      }
    }
  };
  findDocument(rootDocument, id);

  return documentPath;
};
