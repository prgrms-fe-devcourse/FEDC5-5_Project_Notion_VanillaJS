import { request } from "./request.js";

const API_END_POINT = '/documents'

export const fetchDocuments = () => 
    request(API_END_POINT)

export const fetchDocument = (id=null) => 
    request(`${API_END_POINT}/${id}`)

export const addDocument = (parent = null) => 
    request(API_END_POINT, "POST", { title : '', parent})

export const updateDocument = ({id, title, content}) => 
    request(`${API_END_POINT}/${id}`, 'PUT', { title, content });

export const deleteDocument = (id) =>
    request(`${API_END_POINT}/${id}`, "DELETE")