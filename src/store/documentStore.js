import createStore from "./createStore.js"
import {
  findDocumentById,
  fetchAllDocuments,
  createNewDocument,
  deleteDocumentById
} from "../apis/documents.js"
import { HTTPError } from "../apis/documents.js"
const initialState = {
  documents: [],
  newDocument: null,
  deletedDocument: null,
  selectedDocument: null,
  error: false
}

const reducer = async (state, action) => {
  switch (action.type) {
    case "FETCH":
      try {
        const documents = await fetchAllDocuments()
        if (action.payload === "/") {
          return {
            ...state,
            documents,
            selectedDocument: { id: "root" },
            error: false
          }
        } else {
          const selectedDocument = await findDocumentById(action.payload)
          return { ...state, documents, selectedDocument, error: false }
        }
      } catch (err) {
        if (err instanceof HTTPError) {
          err.showAlert(err.status)
          return { ...state, error: true }
        }
      }
    case "ADD":
      const newDocument = await createNewDocument(action.payload)
      const updatedDocuments = await fetchAllDocuments()
      return {
        ...state,
        documents: updatedDocuments,
        newDocument,
        error: false
      }

    case "DELETE":
      const deletedDocument = await deleteDocumentById(action.payload)
      const documents = await fetchAllDocuments()
      return {
        ...state,
        documents,
        deletedDocument,
        error: false
      }

    default:
      return { ...state }
  }
}

export const documentStore = new createStore(initialState, reducer)
