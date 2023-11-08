import { request } from "../api/api.js";
import { push } from "../router.js";

export default function DocumentList({
  $target,
  initialState = { selectedDocument: null, documentList: [] },
  onToggle,
}) {
  const $div = document.createElement("div");
  $div.style.display = "flex";
  $div.style.flexDirection = "column";
  $div.style.height = "93%";
  $div.style.overflow = "auto";

  $target.appendChild($div);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  //하위 요소를 모두 탐색해서 저장하고 출력하는 함수
  const documentDepth = (list, depth, arr) => {
    for (let i = 0; i < list.length; i++) {
      const { id, title, documents, isToggle } = list[i];
      arr.push(
        `
            <ul class="subDocument">
              <li class="subDocument_data" id="${id}" style="padding-left:${depth}px;">
                  <div class="documentHover">
                      <div class="documentHeader">
                      <button class="documentToggleButton ${
                        isToggle ? "toggleOn" : ""
                      }" data-istoggle="${isToggle}">></button>
                        <div style="width:${250 - depth * 4}px">${title}</div>
                      </div>
                        <div class="buttonGroup">
                          <button class="documentDeleteButton">x</button>
                          <button class="documentCreateButton">+</button>
                        </div>
                  </div>
                  ${
                    isToggle
                      ? documents.length > 0
                        ? documentDepth(documents, depth + 6, [])
                        : "<div style>하위 문서 없음</div>"
                      : ""
                  }
              </li>
          </ul>
          `
      );
    }
    return arr.join("");
  };

  this.render = () => {
    const { selectedDocument, documentList } = this.state;

    $div.innerHTML = `
            <ul class="rootDocument">
                ${documentList
                  .map(
                    (doc) => `
                    <li id="${doc.id}" class="rootDocument_data">
                        
                        <div class="documentHover">
                            <div class="documentHeader">
                              <button class="documentToggleButton ${
                                doc.isToggle ? "toggleOn" : ""
                              }" data-istoggle="${doc.isToggle}">></button>
                              <div>${doc.title}</div>
                            </div>
                          <div class="buttonGroup">
                            <button class="documentDeleteButton">x</button>
                            <button class="documentCreateButton">+</button>
                          </div>
                        </div>
                        ${
                          //doc.documents <- 이걸로만 검사했더니 true가 반환된다. 요렇게 해야함.->doc.documents.length > 0
                          doc.isToggle
                            ? doc.documents.length > 0
                              ? documentDepth(doc.documents, 6, [])
                              : "<div style>하위 문서 없음</div>"
                            : ""
                        }
                    </li>
                            
                        
                `
                  )
                  .join("")}
                  
            </ul>
            <ul  style="margin-top:auto;">
              <li class="rootDocumentCreateDiv">
                <p> +  페이지 추가</p>      
              </li>
            </ul>
        `;
  };
  this.render();

  //post목록 클릭시 클릭된 데이터의 id를 App.js로 보내줌
  $div.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if (!$li) return;

    if ($li.className === "rootDocumentCreateDiv") {
      fetchPostDocument();
    } else {
      const { id } = $li;
      const parent = e.target.closest(".rootDocument_data");
      fetchOrPush(e.target.className, id, parent.id);
    }
  });

  const fetchDeleteDocument = async (id) => {
    const DeletedDocument = await request(`/documents/${id}`, {
      method: "DELETE",
    });

    push("/");
  };

  const fetchPostDocument = async (id) => {
    const createdDocument = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify({
        title: "새 문서",
        parent: id,
      }),
    });
    push(`/documents/${createdDocument.id}`);
  };

  const fetchOrPush = (className, id, parentId) => {
    if (className === "documentCreateButton") {
      fetchPostDocument(id);
    } else if (className === "documentDeleteButton") {
      fetchDeleteDocument(id);
    } else if (classList.contains("documentToggleButton")) {
      onToggle(parentId, id);
      push(`/documents/${id}`);
    } else {
      push(`/documents/${id}`);
    }
  };
}
