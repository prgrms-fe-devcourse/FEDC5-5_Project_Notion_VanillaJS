export default function PostList({
  $target,
  initialState,
  onPostClick,
  onAddPostClick,
  onPostSubClick,
}) {
  const $postList = document.createElement("ul");
  const $addPostWrapper = document.createElement("div");
  $addPostWrapper.className = "addPostWrapper";
  $addPostWrapper.innerHTML = `<button>문서생성</button`;
  $postList.className = "list-depth-1";
  $target.appendChild($postList);
  $target.appendChild($addPostWrapper);

  /* 
    [{ title: string }]
  */
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const createDocumentHtml = (postArray, ul, listDepth) => {
    if (postArray.length === 0) return;
    else {
      for (let i = 0; i < postArray.length; i++) {
        const $li = document.createElement("li");
        $li.dataset.id = postArray[i].id;

        $li.style.paddingLeft = "15px";

        $li.innerHTML = `
          <button class="arrow-down">
            <img src=/img/icon-down-arrow.png width="10px">
          </button>
          📄${postArray[i].title || "제목 없음"}
          <button class="removePost">x</button>
          <button class="addPost">+</button>
        `;

        ul.appendChild($li);

        if (postArray[i].documents.length >= 1) {
          const $ul = document.createElement("ul");
          $ul.className = `list-depth-${listDepth}`;
          $li.appendChild($ul);
          createDocumentHtml(postArray[i].documents, $ul, listDepth + 1);
        }
      }
    }
  };

  this.render = () => {
    $postList.innerHTML = "";
    createDocumentHtml(this.state, $postList, 2);
  };
  this.render();

  $postList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const $btn = e.target.closest("button");
    const { id } = $li.dataset;

    if ($btn) {
      const className = $btn.className;
      onPostSubClick(className, id);
    } else {
      onPostClick(id);
    }
  });

  $addPostWrapper.querySelector("button").addEventListener("click", () => {
    onAddPostClick();
  });
}
