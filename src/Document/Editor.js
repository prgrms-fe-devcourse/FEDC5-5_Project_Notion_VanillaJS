//import FindTitle from "./FindTitle.js"; 구현 실패
import { request } from "../../library/api.js";
import { changeRootTitle } from "../../library/titleChanger.js";
import { markdownToHtml, htmlToMarkdown } from "../../library/convert.js";
export default function Editor({ $page, initialState }) {
  this.state = initialState;

  const handleKeyUp = async (e) => {
    if (e.target.className === "editor-title") {
      handleTitle(e.target.value);
    } else if (e.target.className === "editor-content") {
      handleContent(e.target);
    }
  };

  const handleTitle = async (e) => {
    const nextState = {
      ...this.state,
      title: e,
    };
    if (e === "") {
      nextState.title = "제목없음";
    }
    this.setState(nextState);
    await fetchEditDoc(this.state);
    changeRootTitle(this.state);
  };

  const handleContent = async (e) => {
    const content = markdownToHtml(e.innerText);
    const nextState = {
      ...this.state,
      content: content,
    };
    this.setState(nextState);
    //findTitle.setState(nextState); Find Title 실패
    //await findTitle.findMatchedTitle(nextState.content);
    await fetchEditDoc(this.state);
  };

  //const findTitle = new FindTitle({ $page, initialState }); 실패
  const fetchEditDoc = async (document) => {
    await request(`/documents/${document.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: `${document.title}`,
        content: `${document.content}`,
      }),
    });
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.render = () => {
    if (this.state.title === "제목없음") {
      $page.innerHTML = `
        <input type="text" class="editor-title" style="width:93%; height:5%; margin:20px;" placeholder="제목을 입력하세요">
        <div contenteditable="true" class="editor-content" id="contentInput" style="border:1px solid black;border-radius: 0.5rem;">${this.state.content}</div>
      `;
    } else {
      $page.innerHTML = `
        <input type="text" class="editor-title" name="title" style="width:93%; height:5%; margin:20px;" value="${
          this.state.title
        }">
        <div contenteditable="true" class="editor-content" id="contentInput" style="${
          this.state.content === ""
            ? "border:1px solid black; border-radius: 0.5rem"
            : ""
        }">${this.state.content}</div>
      `;
    }

    window.addEventListener("click", (event) => {
      switch (event.target.className) {
        case "editor-content":
          console.log("스위치케이스", clickflag);
          this.focused();
          break;
        case "RootContainer":
          console.log(event.target.className);
          this.focusOut();
        default:
          break;
      }
    });
  };
  let clickflag;
  this.focused = () => {
    //편집기에 포커스가 향하게 된다면 html태그를 마크다운 언어로 풀어주고, 편집기능 시작.
    console.log("focused발생", clickflag);
    if (clickflag) {
      return;
    }
    const contentEditableContent = htmlToMarkdown(this.state.content);
    $page.innerHTML = `
      <input type="text" class="editor-title" name="title" style="width:93%; height:5%; margin:20px;" value="${this.state.title}">
      <div contenteditable="true" class="editor-content" id="contentInput" ">${contentEditableContent}</div>
    `;

    const $contentInput = document.getElementById("contentInput");
    $contentInput.focus();
    clickflag = true;
  };

  this.focusOut = () => {
    //편집기에 사라지면 마크다운 언어를 html로 바꿔준다.
    console.log("focusout발생", clickflag);
    const contentEditableContent = markdownToHtml(this.state.content);
    $page.innerHTML = `
      <input type="text" class="editor-title" name="title" style="width:93%; height:5%; margin:20px;" value="${this.state.title}">
      <div contenteditable="true" class="editor-content" id="contentInput" ">${contentEditableContent}</div>
    `;
    clickflag = false;
  };

  $page.addEventListener("keyup", (e) => handleKeyUp(e));
}
