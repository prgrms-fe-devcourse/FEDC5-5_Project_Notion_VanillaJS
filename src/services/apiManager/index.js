import * as requests from "./requests.js";
import * as responses from "./responses.js";

const ENDPOINT = "https://kdt-frontend.programmers.co.kr/documents";

const fetchApi = ({ method = "GET", body, pathname = "" }) => {
    return fetch(`${ENDPOINT}${pathname}`, {
        method,
        headers: {
            "x-username": "dongguen",
            "Content-Type": "application/json",
        },
        body:
            method === "GET" || method === "DELETE"
                ? null
                : JSON.stringify(body),
    }).then((res) => res.json());
};

export async function createDocument(body) {
    try {
        requests.validateCreateDocumentRequest(body);
        const res = await fetchApi({ method: "POST", body });
        responses.validateCreateDocumentResponse(res);
        return res;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getRootDocument() {
    try {
        const res = await fetchApi({});
        responses.validateRootDocumentResponse(res);
        return res;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getDocumentContent(documentId) {
    try {
        const res = await fetchApi({ pathname: `/${documentId}` });
        responses.validateDocumentContentResponse(res);
        return res;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export function deleteDocument(documentId) {
    try {
        fetchApi({ pathname: `/${documentId}`, method: "DELETE" });
    } catch (err) {
        console.error(err);
        return null;
    }
}

export function updateDocument(documentId, body) {
    try {
        requests.validateUpdateDocumentRequest(body);
        fetchApi({ pathname: `/${documentId}`, method: "PUT", body });
    } catch (err) {
        console.error(err);
        return null;
    }
}
