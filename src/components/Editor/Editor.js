import { request } from "../../api/api.js";
import { push } from "../../router.js";
import ChildPageContainer from "./ChildPageContainer.js";

export default function Editor({
  $target,
  initialState,
  onEditing,
  validateLink,
}) {
  const $editor = document.createElement("div");
  $editor.className = "editor";
  $editor.innerHTML = `
    <input class='editor_title' type="text" name="title" placeholder='제목을 입력하세요'/>
    <div class='editor_content' name="content" contentEditable='true'></div>
  `;
  const $childPageContainer = new ChildPageContainer({
    $target: $editor,
    initialState: (this.state && this.state.documents) || [],
    onSubPageClick: async (id) => {
      const pageInfo = await request(`/documents/${id}`);
      this.setState(pageInfo);
      push(`/${pageInfo.id}`);
    },
  });

  $target.appendChild($editor);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    $childPageContainer.setState((this.state && this.state.documents) || []);
    this.render();
  };
  this.parseContent = (content) => {
    if (!content) return "";

    const richContent = content
      .split("<div>")
      .map((line) => {
        line = line.replace("</div>", "");
        //console.log(line);
        const docLinkRegExp = /http:\/\/localhost:3000\/(\d+.*)/g;
        const match = docLinkRegExp.exec(line);
        if (match) {
          validateLink(+match[1]);
          if (validateLink(+match[1])) {
            return `<div>${line}</div>`;
          }
        }
        const boldRegExp = /[*]{2}(.*)[*]{2}/g;
        // const italicRegExp = /[*]{1}(.*)[*]{1}/g;
        if (boldRegExp.test(line))
          line = line.replace(boldRegExp, "<strong>$1</strong> ");
        // line = line.replace(italicRegExp, "<em>$1</em>");
        //console.log(line);

        if (line === "") return "";
        if (line === "---") line = "<hr>";

        if (line.indexOf("# ") === 0) {
          line = line.replace(/[\#]{1}(.+)/g, "<div><h1>$1</h1></div>");
        } else if (line.indexOf("## ") === 0) {
          line = line.replace(/[\#]{2}(.+)/g, "<div><h2>$1</h2></div>");
        } else if (line.indexOf("### ") === 0) {
          line = line.replace(/[\#]{3}(.+)/g, "<div><h3>$1</h3></div>");
        } else if (line.indexOf("#### ") === 0) {
          line = line.replace(/[\#]{4}(.+)/g, "<div><h4>$1</h4></div>");
        } else {
          line = `<div>${line}</div>`;
        }
        return line;
      })
      .join("");

    return richContent;
  };
  this.render = () => {
    //console.log(this.state);
    $editor.querySelector("[name=title]").value = this.state.title;

    const $content = $editor.querySelector("[name=content]");

    $content.innerHTML = this.parseContent(this.state.content);
  };

  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    this.setState({ ...this.state, title: e.target.value });
    onEditing(this.state);
  });

  $editor.querySelector("[name=content]").addEventListener("input", (e) => {
    this.setState({ ...this.state, content: e.target.innerHTML });
    onEditing(this.state);

    const selection = window.getSelection();
    const range = document.createRange();

    selection.removeAllRanges();
    range.selectNodeContents(e.target);
    range.collapse(false);
    selection.addRange(range);
    e.target.focus();
  });
}
