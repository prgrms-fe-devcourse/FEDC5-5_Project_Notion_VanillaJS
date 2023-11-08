const $ = document;
export default function SideAreaPage({ $target, initialState, onClickPage, onClickCreateNewPageButton, onClickDeleteButton }) {
  const $pageList = $.createElement("div");
  $pageList.className = "sideBarPageList";
  $target.appendChild($pageList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
    addEventDocs();
  };

  const getStringLength = (str) => {
    let strLength = 0;

    for (let i = 0; i < str.length; i++) {
      let code = str.charCodeAt(i);
      let ch = str.substr(i, 1).toUpperCase();

      code = parseInt(code);

      if ((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") && (code > 255 || code < 0)) {
        strLength = strLength + 2;
      } else {
        strLength = strLength + 1;
      }
    }
    return strLength;
  };

  const pageListRenderer = (parentTag, page) => {
    page.map(({ id, title, documents }) => {
      if (documents.length > 0) {
        const createdUl = $.createElement("ul");
        const createdLi = $.createElement("li");

        createdLi.setAttribute("data-isFolded", "false");
        createdUl.setAttribute("data-isFolded", "false");

        const addPageButton = $.createElement("button");
        addPageButton.innerText = "+";
        addPageButton.id = "addPageButton";

        const addDeletePageButton = $.createElement("button");
        addDeletePageButton.innerText = "x";
        addDeletePageButton.id = "addDeletePageButton";

        const inheritedParentStyle = Number(parentTag.style.paddingLeft.replace("px", ""));
        if (inheritedParentStyle) {
          createdUl.style.paddingLeft = `${inheritedParentStyle + 3}px`;
        } else {
          createdUl.style.paddingLeft = "3px";
        }

        createdLi.dataset.id = id;
        if (title.length) {
          if (getStringLength(title) < 25) {
            createdLi.innerText = `${title}`;
          } else {
            const reducedTitle = title.slice(0, 13 - (inheritedParentStyle / 3) * 2) + "...";
            createdLi.innerText = `${reducedTitle}`;
          }
        } else {
          createdLi.innerText = ``;
        }

        const toggleFoldButton = $.createElement("button");
        toggleFoldButton.innerText = ">";
        toggleFoldButton.id = "toggleFoldButton";
        toggleFoldButton.setAttribute("data-isClicked", "false");

        createdLi.prepend(toggleFoldButton);
        createdLi.appendChild(addPageButton);
        createdLi.appendChild(addDeletePageButton);
        createdUl.appendChild(createdLi);
        parentTag.appendChild(createdUl);
        pageListRenderer(createdUl, documents);
      } else {
        const createdUl = $.createElement("ul");
        const createdLi = $.createElement("li");

        createdLi.setAttribute("data-isFolded", "false");
        createdUl.setAttribute("data-isFolded", "false");

        const addPageButton = $.createElement("button");
        addPageButton.innerText = "+";
        addPageButton.id = "addPageButton";

        const addDeletePageButton = $.createElement("button");
        addDeletePageButton.innerText = "x";
        addDeletePageButton.id = "addDeletePageButton";

        const inheritedParentStyle = Number(parentTag.style.paddingLeft.replace("px", ""));
        if (inheritedParentStyle) {
          createdUl.style.paddingLeft = `${inheritedParentStyle + 3}px`;
        } else {
          createdUl.style.paddingLeft = "3px";
        }

        createdLi.dataset.id = id;
        if (title.length) {
          if (getStringLength(title) < 25) {
            createdLi.innerText = `${title}`;
          } else {
            const reducedTitle = title.slice(0, 13 - (inheritedParentStyle / 3) * 2) + "...";
            createdLi.innerText = `${reducedTitle}`;
          }
        } else {
          createdLi.innerText = ``;
        }

        const toggleFoldButton = $.createElement("button");
        toggleFoldButton.innerText = ">";
        toggleFoldButton.id = "toggleFoldButton";
        toggleFoldButton.setAttribute("data-isClicked", "false");

        createdLi.prepend(toggleFoldButton);
        createdLi.appendChild(addPageButton);
        createdLi.appendChild(addDeletePageButton);
        createdUl.appendChild(createdLi);
        parentTag.appendChild(createdUl);
      }
    });
  };

  this.render = () => {
    $pageList.innerHTML = "";
    pageListRenderer($pageList, this.state);
  };

  this.render();

  const addEventDocs = () => {
    $pageList.querySelectorAll("li").forEach(($li) => {
      $li.addEventListener("click", (e) => {
        const targetTag = e.target;
        if (targetTag.tagName === "LI") {
          history.pushState(null, null, `/documents/${targetTag.dataset.id}`);
          onClickPage(targetTag.dataset.id);
        }

        if (targetTag.id === "addPageButton") {
          onClickCreateNewPageButton(targetTag.parentElement.dataset.id);
        }

        if (targetTag.id === "addDeletePageButton") {
          onClickDeleteButton(targetTag.parentElement.dataset.id);
        }

        if (targetTag.id === "toggleFoldButton") {
          if (targetTag.dataset.isclicked === "false") {
            targetTag.dataset.isclicked = "true";
          } else {
            targetTag.dataset.isclicked = "false";
          }
          let newTarget = targetTag.parentElement.nextSibling;
          if (newTarget) {
            while (1) {
              if (newTarget === null) {
                break;
              } else {
                const checker = newTarget.dataset.isfolded;
                checker === "true" ? (newTarget.dataset.isfolded = false) : (newTarget.dataset.isfolded = true);
                newTarget = newTarget.nextSibling;
              }
            }
          } else {
            console.log(`접을 하위 페이지 없음`);
          }
        }
      });
    });
  };
}
