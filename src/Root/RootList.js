export default function RootList({ $page, initialState, onClick, addNewDoc }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $page.innerHTML = `
        <div class="document_tree">
        <p>DocumentTree <button class="addParent">새 문서 추가</button></p>
            <ul>
            ${this.state
              .map(
                (document) =>
                  `<li data-id=${document.id} class="rootList">${
                    document.title.length > 10
                      ? `${document.title.slice(0, 10)}...` // 문자열을 10글자까지 자름
                      : document.title
                  } <button class="addSibling">+</button></li>
                  ${
                    document.documents.length !== 0
                      ? `<div>${document.documents[0].title}</div>` //일단 출력만. 재귀로 다듬읍십다. (문서 안에 문서)
                      : document.documents
                  }
                  `
              )
              .join("")}
            </ul>
        </div>
        `;
  };
  //이제 이거를 push로 바꿔야할듯
  $page.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const $button = e.target.closest("button");
    //console.log(e.target);
    if ($li) {
      $li.classList.add("selected");
      const { id } = $li.dataset;
      onClick(id);
    }
    if ($button) {
      if ($button.className === "addParent") {
        console.log(1);
        addNewDoc();
      } else {
        console.log($button.className);
        console.log($li);
      }
    }
  });
}
