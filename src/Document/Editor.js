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
    if (this.state.content === "") {
    }
    this.focused(); //render가 될때마다 addEventListener가 되는걸 고치고 싶었는데 실패함.
  };

  this.focused = () => {
    const $contentInput = $page.querySelector(".editor-content");
    //편집기에 포커스가 향하게 된다면 html태그를 마크다운 언어로 풀어준다.
    $contentInput.addEventListener("focus", () => {
      const contentEditableContent = htmlToMarkdown(this.state.content);
      $page.innerHTML = `
      <input type="text" class="editor-title" name="title" style="width:93%; height:5%; margin:20px;" value="${this.state.title}">
      <div contenteditable="true" class="editor-content" id="contentInput" ">${contentEditableContent}</div>
    `;
    });
  };

  // editor에 입력이 있으면 handleKeyUp 실행
  $page.addEventListener("keyup", (e) => handleKeyUp(e));
}
