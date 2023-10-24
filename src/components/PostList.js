import { push } from "../utils/router.js";

// import ArrowBottomIcon from "../icons/arrow-bottom.svg";
// import ArrowRightIcon from "../icons/arrow-right.svg";

export default function PostList({
  $target,
  initialState,
  handleDeletePost,
  handleAddPost,
}) {
  const $postList = document.createElement("div");
  $postList.className = "post-list";
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // 자식 문서를 재귀로 리스트에 출력하는 함수
  const recursiveList = (posts) => {
    if (posts.length !== 0) {
      return posts
        .map(
          (post) =>
            `<li data-id=${post.id} class="post-li">
            <div class="parent-list">
            <img class="toggle-img" src="/src/icons/arrow-${
              post.documents.length === 0 ? "right" : "bottom"
            }.svg" />
            <div class="post-title">${post.title}</div>
            <img class="add-child-img" src="/src/icons/add.svg" />
            <img class="delete-post-img" src="/src/icons/delete.svg" />
            </div>
            ${
              post.documents.length !== 0
                ? `<ul class="toggle-ul active">${recursiveList(
                    post.documents
                  )}</ul>`
                : "<ul class='toggle-ul'><div style='color: darkgrey'>하위 문서 없음</div></ul>"
            }
          </li>`
        )
        .join("");
    }
    return "";
  };

  this.render = () => {
    $postList.innerHTML = `
    <img class="add-root-img" src="/src/icons/add.svg" />
    <ul class="toggle-ul active">${recursiveList(this.state)}</ul>
    `;
  };

  // 토글 기능 수행 함수
  // ## render 될 때 처음부터 하위페이지가 모두 펼쳐져서 지저분
  const handleToggle = (e) => {
    const $childrenUl = e.target.closest("li").querySelector(".toggle-ul");

    if ($childrenUl.children[0] === "div") {
      return;
    }

    const $toggleImg = e.target;

    if ($childrenUl.classList.contains("active")) {
      $childrenUl.classList.remove("active");
      $toggleImg.src = "/src/icons/arrow-right.svg";
    } else {
      $childrenUl.classList.add("active");
      $toggleImg.src = "/src/icons/arrow-bottom.svg";
    }
  };

  $postList.addEventListener("click", (e) => {
    // 루트 문서 생성
    // ## 우측 상단으로 옮기기
    if (e.target.matches(".add-root-img")) {
      push(`/documents/new`);
      handleAddPost();
      return;
    }

    const { id } = e.target.closest("li").dataset;

    // 문서 열람 & 편집
    if (e.target.matches(".post-title")) {
      push(`/documents/${id}`);
      return;
    }

    // 문서 삭제
    if (e.target.matches(".delete-post-img")) {
      handleDeletePost(parseInt(id));
      return;
    }

    // 자식 문서 생성
    if (e.target.matches(".add-child-img")) {
      push(`/documents/new`);
      handleAddPost(parseInt(id));
      handleToggle(e);
      return;
    }

    // 하위 문서 토글
    if (e.target.matches(".toggle-img")) {
      handleToggle(e);
      return;
    }
  });

  this.render();
}
