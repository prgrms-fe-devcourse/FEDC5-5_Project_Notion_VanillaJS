const API_END_POINT = 'https://kdt-frontend.programmers.co.kr'

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username' : 'suyoung'
      }
    })
  
    if (res.ok) {
      return await res.json()
    }
    
    throw new Error('api 처리 중 에러 발생!')
  } catch(e) {
    console.log(e.message)
  }
}