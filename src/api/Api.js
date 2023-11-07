import CheckRequestStatus from "./checkRequstStatus.js";
export const API_END_POINT = "https://kdt-frontend.programmers.co.kr/documents";

export const request = async (url = "", options) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "mino",
      },
    });

    if (res.ok) {
      return await res.json();
    }
    CheckRequestStatus(res);
    throw new Error("API 처리 중 뭔가 이상합니다.");
  } catch (e) {
    alert(e.message);
  }
};

/** API에 더미 데이터 추가 */
// const testData = { title: "여기에도!", parent: null };

// async function add(params) {
//   const newData = await request("", {
//     method: "POST",
//     body: JSON.stringify(params),
//   });

//   return newData;
// }
// add(testData)

/** 루트 데이터 가져오기 */
export async function getRootData() {
  const rootData = await request("", {
    method: "GET",
  });

  return await rootData;
}

/** 특정 데이터 가져오기 */
export async function getData(id) {
  const data = await request(`/${id}`, {
    method: "GET",
  });

  return data;
}

/** 데이터 추가하기 */
export async function addNewData(targetParentId) {
  const newData = await request("", {
    method: "POST",
    body: JSON.stringify({ title: "", parent: targetParentId }),
  });
  return await newData;
}

/** 데이터 수정하기 */
export async function updateData({ documentId, title, content }) {
  await request(`/${documentId}`, {
    method: "PUT",
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
}

/** 데이터 삭제하기 */
export async function deleteData(documentId) {
  await request(`/${documentId}`, {
    method: "DELETE",
  });
}
