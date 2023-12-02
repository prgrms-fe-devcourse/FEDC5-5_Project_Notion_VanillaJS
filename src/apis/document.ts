import api from "./core";
import {
  DocumentDeleteResponse,
  DocumentDetailResponse,
  DocumentPostRequest,
  DocumentPostResponse,
  DocumentPutRequest,
  DocumentPutResponse,
  DocumentResponse,
} from "@/types";

export const getDocuments = async () => {
  const documents = await api.get<{ url: string }, DocumentResponse[]>({ url: "/documents" });

  return documents;
};

export const getDocument = async (id: number) => {
  const document = await api.get<{ url: string }, DocumentDetailResponse>({ url: `/documents/${id}` });

  return document;
};

export const postDocument = async ({ title, parent }: DocumentPostRequest) => {
  const postedDocument = await api.post<{ title: string; parent: null | number }, DocumentPostResponse>({
    url: "/documents",
    body: { title, parent },
  });

  return postedDocument;
};

export const updateDocument = async ({ id, title, content }: DocumentPutRequest) => {
  const updatedDocument = await api.put<{ title: string; content: string }, DocumentPutResponse>({
    url: `/documents/${id}`,
    body: { title, content },
  });

  return updatedDocument;
};

export const deleteDocument = async (id: number) => {
  const deletedDocument = await api.delete<{ url: string }, DocumentDeleteResponse>({ url: `/documents/${id}` });

  return deletedDocument;
};
