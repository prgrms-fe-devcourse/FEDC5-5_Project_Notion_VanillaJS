export default class ListItem {
  constructor({ $target, initialState, isTopLevel = true }) {
    this.$documentList = document.createElement("div");
    this.$documentList.classList = "div-ul-li-container";
    if (isTopLevel) {
      this.$documentList.style.display = "block"; // 최상위 요소는 보이도록 설정
    } else {
      this.$documentList.style.display = "none"; // 그 외의 경우는 숨김 처리
    }
    this.$target = $target;
    this.state = initialState;
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$documentList.innerHTML = "";
    const $ul = document.createElement("ul");
    this.$documentList.appendChild($ul);

    this.state.forEach(({ id, title, documents }) => {
      const $li = document.createElement("li");
      $li.dataset.id = id;
      $li.classList = "li-document";

      const $toggle = document.createElement("div");
      $toggle.className = "toggle-folder";
      $toggle.textContent = "˃";

      const $title = document.createElement("div");
      $title.textContent = `${title} `;
      $title.classList = "click-folder";

      const $remove = document.createElement("div");
      $remove.className = "remove-folder";
      $remove.textContent = "➖";
      $remove.style.display = "none";

      const $add = document.createElement("div");
      $add.className = "add-folder";
      $add.textContent = "➕";
      $add.style.display = "none";

      $li.appendChild($toggle);
      $li.appendChild($title);
      $li.appendChild($add);
      $li.appendChild($remove);

      $li.style.listStyle = "none";
      $ul.appendChild($li);

      if (documents.length > 0) {
        new ListItem({
          $target: $li, // 하위 목록을 현재 li 내에 추가
          initialState: documents,
          isTopLevel: false,
        });
      } else {
        const $span = document.createElement("span");
        $li.appendChild($span);
        $span.className = "non-documents";
        $span.textContent = "하위폴더가 없습니다.";
        $span.style.display = "none";
        $span.style.marginLeft = "18px";
      }
    });
    this.$target.appendChild(this.$documentList);
  }
}

// 여기 li에서 css처리해주면 각 부분이 깔끔하게 나올 듯?
