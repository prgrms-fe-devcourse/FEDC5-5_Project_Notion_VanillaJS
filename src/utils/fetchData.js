export const ROOT_DOCUMETS_URL =
  "https://kdt-frontend.programmers.co.kr/documents";

export const HEADER_OPTION = {
  "x-username": "ienrum",
  "Content-Type": "application/json",
};
export const OPTIONS = { headers: HEADER_OPTION };

export default async function fetchData(url, options = { method: "GET" }) {
  try {
    console.log(options, url);
    const result = await fetch(url, options);
    if (!result.ok) {
      throw new Error("데이터를 불러오는데 실패했습니다.");
    }
    return await result.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
export async function getDocumentsWithValidation(
  url,
  headerOption = { "x-username": "ienrum" }
) {
  const options = {
    method: "GET",
    headers: headerOption,
  };
  const data = await fetchData(url, options);
  if (data === null) {
    return [];
  }
  return data;
}

export async function postDocumentWithValidation(
  url,
  headerOption = { "x-username": "ienrum" },
  body
) {
  const options = {
    method: "POST",
    headers: headerOption,
    body: JSON.stringify(body),
  };
  const data = await fetchData(url, options);
  if (data === null) {
    return {};
  }
  return data;
}

export async function getDocumentWithValidation(
  url,
  headerOption = { "x-username": "ienrum" },
  id
) {
  url = url + "/" + id;
  const options = {
    method: "GET",
    headers: headerOption,
  };
  const data = await fetchData(url, options);
  if (data === null) {
    return {};
  }
  return data;
}
export async function putDocumentWithValidation(
  url,
  headerOption = { "x-username": "ienrum" },
  id,
  body
) {
  url = url + "/" + id;
  const options = {
    method: "PUT",
    headers: headerOption,
    body: JSON.stringify(body),
  };
  const data = await fetchData(url, options);
  if (data === null) {
    return {};
  }
  return data;
}

export async function deleteDocuments() {
  const documents = await getDocumentsWithValidation(
    ROOT_DOCUMETS_URL,
    HEADER_OPTION
  );
  const ids = getIDs(documents);
  ids.forEach(async (id) => {
    await deleteDocumentWithValidation(ROOT_DOCUMETS_URL, HEADER_OPTION, id);
  });
}

export async function deleteDocumentWithValidation(
  url,
  headerOption = { "x-username": "ienrum" },
  id
) {
  url = url + "/" + id;
  const options = {
    method: "DELETE",
    headers: headerOption,
  };
  const data = await fetchData(url, options);
  if (data === null) {
    return {};
  }
  return data;
}

export function getIDs(documents) {
  let ids = [];
  documents.forEach((item) => {
    ids.push(item.id);
    if (item.documents.length > 0) {
      ids = ids.concat(getIDs(item.documents));
    }
  });
  return ids;
}
export async function getDatas() {
  const documents = await getDocumentsWithValidation(
    ROOT_DOCUMETS_URL,
    HEADER_OPTION
  );
  return documents;
}

export async function getData(id) {
  const documents = await getDocumentWithValidation(
    ROOT_DOCUMETS_URL,
    HEADER_OPTION,
    id
  );
  return documents;
}
export async function postData(data) {
  const documents = await postDocumentWithValidation(
    ROOT_DOCUMETS_URL,
    HEADER_OPTION,
    data
  );
  return documents;
}

export async function putData(id, data) {
  const documents = await putDocumentWithValidation(
    ROOT_DOCUMETS_URL,
    HEADER_OPTION,
    id,
    data
  );
  return documents;
}
