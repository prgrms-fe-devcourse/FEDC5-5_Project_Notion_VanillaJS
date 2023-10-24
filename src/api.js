export const API_END_POINT = "https://kdt-frontend.programmers.co.kr/documents";

export const request = async (url, options = {}) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "x-username": "ShinJongUk",
            },
        });
        if (res.ok) {
            return await res.json();
        }
        throw new Error("API 처리중 문제 발생");
    } catch (error) {
        console.error(error.message);
    }
};

// root document 가져오기
// 전체 Document의 구조를 트리 형태로 가져옵니다.
export const getRootDocument = async (url = "") => {
    const data = await request(url);

    return data;
};

// 특정 Document의 content 조회하기
export const getSelectedDocument = async (url) => {
    const data = await request(url);

    return data;
};

// Document 생성하기
export const makeNewDocument = async (url, post) => {
    const data = await request(url, {
        method: "POST",
        body: JSON.stringify(post),
    });

    return data;
};

// 특정 Document 수정하기
export const updateDocument = async (url) => {
    const data = await request(url, {
        method: "PUT",
    });

    return data;
};

// 특정 Document 삭제하기
export const deleteDocument = async (url) => {
    await request(url, {
        method: "DELETE",
    });
};
