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
