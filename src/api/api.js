export const API_END_POINT = `https://kdt-frontend.programmers.co.kr`;

export const request = async (url, options={}) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`, {
            ...options,
            headers: {
                'Content-type' : 'application/json',
                'x-username' : 'JoSeungHyeon'
            }
        });
        
        if(res.ok) {
            return await res.json();
        }

        throw new Error('API 호출 에러');
    } catch(e) {
        console.log(e);
    }
}