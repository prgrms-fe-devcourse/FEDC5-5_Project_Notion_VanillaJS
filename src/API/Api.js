const API_END_POINT = "https://kdt-frontend.programmers.co.kr";
const X_USER = "Lee Jae Young";

export async function request(url, options) {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "x-username": X_USER,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    alert(error.message);
  }
}

/* insert */

export async function insertPage(params) {
  const createdPost = await request("/documents", {
    method: "POST",
    body: JSON.stringify(params),
  });

  return createdPost;
}

/* delete */

export async function deletePage(id) {
  await request(`/documents/${id}`, {
    method: "DELETE",
  });
}

/* getPage */

export async function getPage(id) {
  const page = await request(`/documents/${id}`, {
    method: "GET",
  });

  return page;
}

/* UpdatePage */

export async function updatePage({ id, title, content }) {
  return await request(`/documents/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
  });
}
