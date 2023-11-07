import CreateListInPost from "./CreateListInPost.js";
import isChildPostsOpened from "./isChildPostsOpened.js";

export default function Post({ depth, documents, $target }) {
  documents.forEach(async ({ id, title, documents: childDocuments }) => {
    const $ul = document.createElement("ul");

    // li를 만든다. ( title과 버튼들이 포함되어 있음 )
    const $li = CreateListInPost({ depth, id, title });

    $ul.appendChild($li);

    $target.appendChild($ul);

    // 현재 li의 id가 로컬스토리지에 저장되어 있다면 현재 li의 부모요소인 ul이 보여져야 되고, 
    // ul의 부모요소(ul) 안의 li의 토글 버튼이 아래 화살표를 가리켜야 한다. (오른쪽화살표 : 닫힘, 아래화살표 : 열림)
    if (isChildPostsOpened(id)) {
      $ul.className = "children-post-block"; // 보여짐 처리 
      $li.parentNode.parentNode
        .querySelector("li")
        .querySelector(
          ".toggle-button"
        ).innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
    } else {
      $ul.className = "children-post";
    }

    Post({
      depth: depth + 1,
      documents: childDocuments,
      $target: $ul,
    });
  });
}
