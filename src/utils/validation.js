export const validPostsArray = (posts) => {
  if (!Array.isArray(posts)) {
    throw new Error("posts가 배열이 아닙니다.");
  }

  posts.map(({ id, title }) => {
    if ((typeof id !== "number", typeof title !== "string")) {
      throw new Error(`post-${id} 값이 올바르지 않습니다.`);
    }
  });
};

export const validPost = (post) => {
  const { title } = post;
  if (title === undefined || title === null) {
    throw new Error(`post 값이 올바르지 않습니다.`);
  }
};
