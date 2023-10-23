export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
    try{
        const res = await fetch(`${API_END_POINT}${url}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
            },
        });

        if(res.ok){
            return await res.json();
        }
        throw new Error("API 처리중 뭔가 이상합니다!");
    }
    catch(e){
        alert(e.message);
    }
};