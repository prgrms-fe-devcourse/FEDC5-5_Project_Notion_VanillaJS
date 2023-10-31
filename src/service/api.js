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

export const getRootDocument = async (url = "") => {
    const data = await request(url);

    return data;
};

export const getSelectedDocument = async (url) => {
    const data = await request(url);

    return data;
};

export const makeNewDocument = async (url, post) => {
    const data = await request(url, {
        method: "POST",
        body: JSON.stringify(post),
    });

    return data;
};

export const updateDocument = async (url, post) => {
    const data = await request(url, {
        method: "PUT",
        body: JSON.stringify(post),
    });

    return data;
};

export const deleteDocument = async (url) => {
    await request(url, {
        method: "DELETE",
    });
};
