export const postStorage = {};

// postStorage 객체 키(title) 값(id) 추가
export const pushPostStorage = (postData) => {
  const { title, id } = postData;

  if (!postStorage[title]) postStorage[title] = id;
  else postStorage[title] = id;
};

// title과 일치하는 text에 링크 걸어줌 -> 클릭 이벤트로 class="linktext"를 뽑아서 씀
export const linkText = (text) => {
  for (const key in postStorage) {
    const regex = new RegExp(key, "g");

    text = text.replace(
      regex,
      `<div class="linktext" id="${postStorage[key]}">📃 ${key}</div>`
    );
  }

  const splitText = text.split("\n").map((data) => {
    if (!data.startsWith("📃")) return data;
    else return;
  });

  return splitText.join("\n");
};
