export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';
export const USER_NAME = 'minsu'

export const request = async (url, option = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...option,
      headers:{
        'Content-Type' : 'application/json',
        'x-username' : USER_NAME
      }
    })
    
    if(res.ok){
      return await res.json();
    }

    throw new Error('API 호출 오류');
  }catch(e){
    alert(e.message)
  }
}