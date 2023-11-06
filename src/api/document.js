import { request } from '.';
import { API_END_POINT } from '@/constants/api';

export const getAllDocuments = async (options = {}) => {
  return await request({
    pathname: API_END_POINT.DOCUMENTS,
    options: {
      method: 'GET',
      ...options,
    },
  });
};

export const getDetailOfDocument = async (documentId, options = {}) => {
  return await request({
    pathname: `${API_END_POINT.DOCUMENTS}/${documentId}`,
    options: {
      method: 'GET',
      ...options,
    },
  });
};

export const createDocument = async (parentDocumentId, options = {}) => {
  return await request({
    pathname: API_END_POINT.DOCUMENTS,
    options: {
      method: 'POST',
      ...options,
    },
    payload: {
      title: '',
      parent: parentDocumentId,
    },
  });
};

export const updateDocument = async (documentId, payload, options = {}) => {
  await request({
    pathname: `${API_END_POINT.DOCUMENTS}/${documentId}`,
    options: {
      method: 'PUT',
      ...options,
    },
    payload,
  });
};

export const deleteDocument = async (documentId, options = {}) => {
  await request({
    pathname: `${API_END_POINT.DOCUMENTS}/${documentId}`,
    options: {
      method: 'DELETE',
      ...options,
    },
  });
};
