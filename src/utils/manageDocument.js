export const setOrToggleIsFolded = (documents, targetId, isFolded = null) => {
  return documents.map((document) => {
    let newIsFolded = document.isFolded;
    if (document.id === targetId) {
      newIsFolded = isFolded !== null ? isFolded : !document.isFolded;
    }

    return {
      ...document,
      isFolded: newIsFolded,
      documents: setOrToggleIsFolded(
        document.documents || [],
        targetId,
        isFolded,
      ),
    };
  });
};

export const mergeDocuments = (oldDocuments, newDocuments) => {
  return newDocuments.map((newDocument) => {
    let isFolded;
    let oldChildrenDocuments = [];

    const matchedOldDocument = oldDocuments.find(
      (oldDocument) => oldDocument.id === newDocument.id,
    );

    if (matchedOldDocument) {
      isFolded = matchedOldDocument.isFolded;
      oldChildrenDocuments = matchedOldDocument.documents;
    } else {
      const isNewDocEmpty =
        !newDocument.documents || newDocument.documents.length === 0;
      isFolded = isNewDocEmpty;
    }

    const newChildrenDocuments = newDocument.documents || [];

    return {
      ...newDocument,
      isFolded,
      documents: mergeDocuments(oldChildrenDocuments, newChildrenDocuments),
    };
  });
};
