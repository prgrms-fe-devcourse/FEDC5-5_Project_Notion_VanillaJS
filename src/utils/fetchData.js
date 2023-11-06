export const ROOT_DOCUMETS_URL =
  "https://kdt-frontend.programmers.co.kr/documents";

export const HEADER_OPTION = {
  "x-username": "ienrum",
  "Content-Type": "application/json",
};

// fetch 함수를 이용해 데이터를 불러오는 함수입니다.
async function fetchData(url, options = { method: "GET" }) {
  try {
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

// get 요청을 보내는 함수입니다.
async function getDocumentsWithValidation(
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

// post 요청을 보내는 함수입니다.
async function postDocumentWithValidation(
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

// id 를 통해 get 요청을 보내는 함수입니다.
async function getDocumentWithValidation(
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

// id 를 통해 put 요청을 보내는 함수입니다.
async function putDocumentWithValidation(
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

// 인터페이스 함수들입니다.

// getDocumentsWithValidation 함수를 이용한 인터페이스 함수입니다.
export async function getDatas() {
  const documents = await getDocumentsWithValidation(
    ROOT_DOCUMETS_URL,
    HEADER_OPTION
  );
  return documents;
}

// getDocumentWithValidation 함수를 이용한 인터페이스 함수입니다.
export async function getData(id) {
  const documents = await getDocumentWithValidation(
    ROOT_DOCUMETS_URL,
    HEADER_OPTION,
    id
  );
  return documents;
}

// postDocumentWithValidation 함수를 이용한 인터페이스 함수입니다.
export async function postData(data) {
  const documents = await postDocumentWithValidation(
    ROOT_DOCUMETS_URL,
    HEADER_OPTION,
    data
  );
  return documents;
}

// putDocumentWithValidation 함수를 이용한 인터페이스 함수입니다.
export async function putData(id, data) {
  const documents = await putDocumentWithValidation(
    ROOT_DOCUMETS_URL,
    HEADER_OPTION,
    id,
    data
  );
  return documents;
}
