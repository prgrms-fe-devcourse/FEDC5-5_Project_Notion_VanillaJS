import { isDataInLocalStorage } from "../utils/storage.js";
import { getData, putData } from "../utils/fetchData.js";

import { getEditingPostData, setEditingPostData } from "../utils/storage.js";

export default function Editor({ $target, initalState, setSideBarState }) {
  const $div = document.createElement("div");
  $div.id = "editor";
  $target.appendChild($div);

  this.idState = 0;
  this.state = initalState;

  this.setIdState = (nextState) => {
    this.idState = nextState;
    if (isDataInLocalStorage(this.idState)) {
      const data = getEditingPostData(this.idState);
      this.setState(data);
    }
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
      this.state.tempUpdatedAt = new Date().toISOString();
      setEditingPostData(this.state.id, this.state);
      setSideBarState(this.state);
      clearTimeout(timer);
      timer = setTimeout(() => {
        const body = {
          title: this.state.title,
          content: this.state.content,
        };
        putData(this.state.id, body).then((data) => {});
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
