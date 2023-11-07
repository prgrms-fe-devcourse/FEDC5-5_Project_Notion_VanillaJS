const API_END_POINT = "https://kdt-frontend.programmers.co.kr";
const X_USERNAME = 'kimhyunjoo'

export const request = async (url='', method='GET', data = null) => {
  try {
    const options = {
      headers: {
        'x-username': X_USERNAME,
        'Content-Type' : 'application/json'
      },
      method
    }

    if((method === 'POST' || method === 'PUT') && data!=null ) {
      options.body = JSON.stringify(data)
    }

    const res = await fetch(`${API_END_POINT}/${url.replace(/^\/(.*)/, '$1')}`, options)

    if (res.ok) {
        return await res.json()
    }

    throw new Error('API 처리 중 오류 발생')

  } catch (e) {
    console.log(e.message);
  }
};