export const filterTitle = (title, maxLength) => {
  if (title === "" || title === null) {
    return "제목 없음";
  } else {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  }
};
