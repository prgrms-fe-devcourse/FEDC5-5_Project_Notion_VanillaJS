import { pageAddDeleteButton } from "./PageButton.js";
import { pushRoute } from "./utils/router.js";
import { localStorageGetItem, localStorageSetItem } from "./utils/storage.js";

export default function SideBarList({
  $target,
  initialState,
  handleChangeList,
}) {
  const $sideBarList = document.createElement("div");
  $sideBarList.className = "side_bar_list";
  $target.appendChild($sideBarList);

  this.state = initialState;

  this.setState = (nextState) => {
    if (nextState.length === 0) {
      // GET요청 res가 []인상태. 아직 만든 페이지가 없음
      $sideBarList.innerHTML =
        "아래 [새 페이지] 버튼을 눌러 페이지를 만들어보세요";
    }
    this.state = nextState;
    this.render();
  };

  const showSubLi = ({ $target, documents }) => {
    const $subUl = document.createElement("ul");
    const paddingLeftValue = $target.style.paddingLeft;
    const spaceValue = paddingLeftValue
      ? Number(paddingLeftValue.replace("px", "")) + 10 + "px"
      : "0px";

    $subUl.style.paddingLeft = spaceValue;
    $subUl.style.right = paddingLeftValue || "0px";
    $target.appendChild($subUl);

    if ($target !== $sideBarList) {
      // $target ===이전의 $subLi
      const id = $target.dataset.id;
      if (
        localStorageGetItem(`doc_tmp_${id}`, { open: false }).open === false
      ) {
        $subUl.style.display = "none";
      }
    }
    documents.map((doc) => {
      const $subLi = document.createElement("li");
      $subLi.style.paddingLeft = spaceValue;
      $subLi.style.right = spaceValue;
      $subLi.dataset.id = doc.id;
      if (
        localStorageGetItem(`doc_tmp_${$subLi.dataset.id}`, { open: false })
          .open
      ) {
        $subLi.innerHTML = `<div class="each"><img class="toggle_button open" src="../assets/right.png"></img><div class="list_title_wrap"><div class="list_title">${doc.title}</div></div></div>`;
      } else {
        $subLi.innerHTML = `<div class="each"><img class="toggle_button" src="../assets/right.png"></img><div class="list_title_wrap"><div class="list_title">${doc.title}</div></div></div>`;
      }

      new pageAddDeleteButton({
        $target: $subLi.firstChild,
        id: doc.id,
        handleChangeList,
        handleToggle: () => {
          const localData = localStorageGetItem(`doc_tmp_${doc.id}`, {
            open: false,
          });
          localStorageSetItem(`doc_tmp_${doc.id}`, {
            ...localData,
            open: true,
          });
          $subLi.firstChild.firstChild.remove("open");
          const liChilds =
            $subLi.lastChild.tagName === "UL" ? $subLi.lastChild : null;
          if (liChilds) {
            liChilds.style.display = "block";
          }
        },
      });
      $subUl.appendChild($subLi);
      if (doc.documents.length > 0) {
        const newDocuments = doc.documents;
        showSubLi({ $target: $subLi, documents: newDocuments });
      } else {
        return;
      }
    });
  };
  this.render = () => {
    const documents = this.state;
    if (documents.length > 0) {
      $sideBarList.innerHTML = "";
      showSubLi({ $target: $sideBarList, documents });
    }
  };
  this.render();

  $sideBarList.addEventListener("click", (e) => {
    const { classList } = e.target;

    if (classList.contains("toggle_button")) {
      const li = e.target.closest("li");
      const liDataId = li.dataset.id;
      const localData = localStorageGetItem(`doc_tmp_${liDataId}`, {
        open: false,
      });
      const isOpen = localData.open;

      if (isOpen) {
        localStorageSetItem(`doc_tmp_${liDataId}`, {
          ...localData,
          open: false,
        });
        e.target.classList.remove("open");
        const liChilds = li.lastChild.tagName === "UL" ? li.lastChild : null;
        if (liChilds) {
          liChilds.style.display = "none";
        }
      } else {
        localStorageSetItem(`doc_tmp_${liDataId}`, {
          ...localData,
          open: true,
        });
        e.target.classList.add("open");
        const liChilds = li.lastChild.tagName === "UL" ? li.lastChild : null;
        if (liChilds) {
          liChilds.style.display = "block";
        }
      }
    } else {
      const li = e.target.closest("li");
      if (li) {
        pushRoute(`/docs/${li.dataset.id}`);
      }
    }
  });
}
