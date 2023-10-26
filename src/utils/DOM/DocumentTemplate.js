import toggleImg from "../../img/toggle.png";

/** 사이드바의 문서 템플릿을 생성하는 함수 */
export const documentListTemplate = (documents, isRoot = false) => {
  return `
            ${documents
              .map(({ id, title }) => {
                return `
                  <ul data-id="${id}" class="document-title" style="display: ${
                  isRoot ? "block" : "none"
                }"> 
                      <li class="document-element">
                          <img src="${toggleImg}" class="toggle-btn"/>
                          <button class="document">${
                            title === "" ? "제목 없음" : title
                          }</button>
                          <div class="control-button">
                              <button class="remove-btn">-</button>
                              <button class="add-sub-btn">+</button>
                          </div>
                      </li>
                  </ul>
              `;
              })
              .join("")}
            `;
};

/** 사이드바에 새롭게 생성된 단일 문서 템플릿을 만드는 함수 */
export const documentTemplate = (id, display, style) => {
  const $template = document.createElement("ul");
  $template.className = "document-title";
  $template.style.display = display;
  if (style) $template.style.paddingLeft = "10px";

  $template.setAttribute("data-id", id);

  $template.innerHTML = `
    <li class="document-element">
      <img src="${toggleImg}" class="toggle-btn" />
       <button class="document">제목 없음</button>
        <div class="control-button">
            <button class="remove-btn">-</button>
            <button class="add-sub-btn">+</button>
        </div>
    </li>
  `;

  return $template;
};
