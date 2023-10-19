import {
  ROOT_DOCUMETS_URL,
  HEADER_OPTION,
  getData,
  putData,
  deleteDocuments,
} from "../utils/fetchData.js";

export default function Editor({ $target, initalState, renderSideBar }) {
  const $div = document.createElement("div");
  $div.id = "editor";
  $target.appendChild($div);

  deleteDocuments();

  this.idState = 0;
  this.state = initalState;

  this.setIdState = (nextState) => {
    this.idState = nextState;
    getData(this.idState).then((data) => {
      const newData = data;
      newData.content = data.content || "";
      newData.title = data.title || "";
      this.setState(data);
    });
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.init = () => {
    let timer;
    $div.addEventListener("keyup", (e) => {
      if (e.target.tagName === "INPUT") {
        this.state = { ...this.state, title: e.target.value };
      } else if (e.target.tagName === "TEXTAREA") {
        this.state = { ...this.state, content: e.target.value };
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        const body = {
          title: this.state.title,
          content: this.state.content,
        };
        putData(this.state.id, body).then((data) => {
          renderSideBar();
        });
      }, 1000);
    });
  };
  this.render = () => {
    $div.innerHTML = `
      <input type="text" value="${this.state.title}" />
      <textarea>${this.state.content}</textarea>
    `;
  };

  this.init();
}
