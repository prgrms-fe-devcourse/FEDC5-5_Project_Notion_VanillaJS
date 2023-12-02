import { useState, useEffect } from "@/core";
import { deleteDocument, getDocuments, postDocument, updateDocument } from "@/apis";
import { navigateTo } from "@/utils";
import { DocumentPostRequest, DocumentPutRequest, DocumentResponse } from "@/types";

const useDocuments = () => {
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);

  const fetchDocuments = async () => {
    try {
      const fetchedDocuments = await getDocuments();

      setDocuments(fetchedDocuments);
      return fetchedDocuments;
    } catch (error) {
      console.error(error);
    }
  };

  const createDocument = async ({ title, parent }: DocumentPostRequest) => {
    try {
      const postedDocument = await postDocument({ title, parent });

      navigateTo(`/documents/${postedDocument.id}`);

      await fetchDocuments();
      return postedDocument;
    } catch (error) {
      throw new Error("Failed to create document");
    }
  };

  const modifyDocument = async ({ id, title, content }: DocumentPutRequest) => {
    try {
      const updatedDocument = await updateDocument({ id, title, content });

      await fetchDocuments();
      return updatedDocument;
    } catch (error) {
      throw new Error("Failed to update document");
    }
  };

  const removeDocument = async (id: number) => {
    try {
      const deletedDocument = await deleteDocument(id);

      await fetchDocuments();
      return deletedDocument;
    } catch (error) {
      throw new Error("Failed to delete document");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return { documents, createDocument, modifyDocument, removeDocument };
};

export default useDocuments;
