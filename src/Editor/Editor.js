import ResizeMenu from "./ResizeMenu.js";
import { linkText } from "../Util/postStorage.js";
import { applyMarkup, removeMarkup } from "../Util/TextScan.js";
import { setCustomEvent } from "../Util/Router.js";

export default function Editor({ $target, initialState, titlePost, EditPost }) {
  // 편집기 content 엘리먼트
  const $editor = document.createElement("div");
  $editor.setAttribute("class", "editDiv");
  $editor.setAttribute("name", "editor");
  $editor.setAttribute("contentEditable", "true");
  $editor.style.outline = 0;

  // 편집기 title 엘리먼트
  const $title = document.createElement("h1");
  $title.setAttribute("contentEditable", "true");
  $title.setAttribute("name", "title");
  $title.style.outline = 0;

  // 사이드 메뉴바 넓이 조정
  const resizeMenu = new ResizeMenu();

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };

  // 편집기의 텍스트를 수정 시 -> 텍스트 내의 title, content, 해당 포스트의 id 콜백으로 전달
  const onEditTextKeyUpEvent = () => {
    // 포스트 title 수정 시 서버 저장
    $title.addEventListener("keyup", (e) => {
      const titleText = $title.innerText;

      // 제목 서버에 저장
      titlePost(titleText, this.state.id);
    });
    // 포스트 content 수정 시 서버 저장
    $editor.addEventListener("keyup", (e) => {
      const titleText = $title.innerText;
      const linkData = linkText($editor.innerText);
      const editText = applyMarkup(linkData);

      // 내용 서버에 저장
      EditPost(titleText, editText, this.state.id);
    });
  };

  // 링크가 걸려있는 텍스트 입력 -> 해당 id(pathname)으로 이동
  const onClickTextRoute = () => {
    [...$editor.querySelectorAll(".linktext")].forEach((item) => {
      item.addEventListener("click", (e) => setCustomEvent(item.id));
    });
  };

  this.render = () => {
    // 편집기 초기 화면
    if (this.state === null) {
      $title.textContent = "";
      $editor.innerHTML = `
        <h1>안녕하세요 🙌🏻</h1>
        <h3>이 화면은 초기 화면입니다.</h3>
        <h3>나만의 포스트를 작성해 보세요. 👨‍💻</h3>`;

      $target.appendChild($editor);
      resizeMenu.render();

      return;
    }

    // title 텍스트 입력
    const { title } = this.state;
    $title.textContent = title;

    $editor.innerHTML = `
      ${
        this.state.content === `<p></p>`
          ? "내용을 입력하세요.<br>"
          : this.state.content
      }
    `;

    $target.appendChild($title);
    $target.appendChild($editor);

    // 메뉴바 리사이즈 작동
    resizeMenu.render();

    // 하위 post 링크
    this.state.documents.forEach((element) => {
      const $div = document.createElement("div");
      $div.setAttribute("class", " link");
      $div.contentEditable = false;

      $div.innerHTML = `📃 ${element.title}<br>`;

      $div.addEventListener("click", () => setCustomEvent(element.id));
      $editor.appendChild($div);
    });

    onEditTextKeyUpEvent();
    // 마크업 제거
    removeMarkup($editor);
    onClickTextRoute();
  };
}
