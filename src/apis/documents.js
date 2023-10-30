const API_ENDPOINT = `https://kdt-frontend.programmers.co.kr`
const headers = {
  "Content-Type": "application/json",
  "x-username": "dlwhd5717"
}
const DOCUMENTS = "documents"
export class HTTPError extends Error {
  constructor(status, message) {
    super(message)
    this.name = "HTTPError"
    this.status = status
  }

  showAlert(msg) {
    console.error(this.status, this.message)
    alert(msg)
  }
}

export const requestDocument = async (url, option) => {
  const res = await fetch(`${API_ENDPOINT}/${url}`, {
    headers,
    ...option
  })
  if (!res.ok) {
    const { status, statusText } = res
    throw new HTTPError(status, statusText)
  }
  return res.json()
}

export const fetchAllDocuments = async () => {
  const data = await requestDocument(DOCUMENTS)
  return data
}

export const createNewDocument = async parentId => {
  const newDocument = {
    title: "new document",
    parent: parentId || null
  }
  const data = await requestDocument(DOCUMENTS, {
    method: "POST",
    body: JSON.stringify(newDocument)
  })
  return data
}

export const findDocumentById = async id => {
  const data = await requestDocument(`${DOCUMENTS}/${id}`, {
    method: "GET"
  })
  return data
}

export const deleteDocumentById = async id => {
  const data = await requestDocument(`${DOCUMENTS}/${id}`, {
    method: "DELETE"
  })
  return data
}

export const editDocument = async (id, content) => {
  const data = await requestDocument(`${DOCUMENTS}/${id}`, {
    method: "PUT",
    body: JSON.stringify(content)
  })
}
