import { isDataInLocalStorage } from "../utils/storage.js";
import { getData, putData } from "../utils/fetchData.js";

import {
  getEditingPostData,
  setEditingPostData,
  removeEditingPostData,
} from "../utils/storage.js";

export default function Editor({ $target, initalState, setSideBarState }) {
  const $div = document.createElement("div");
  $div.id = "editor";
  $target.appendChild($div);

  this.state = initalState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.debounce = debounce(() => {
    const body = {
      title: this.state.title,
      content: this.state.content,
    };
    putData(this.state.id, body).then((data) => {
      setSideBarState(data);
      removeEditingPostData(this.state.id);
    });
  }, 1000);

  this.init = () => {
    $div.addEventListener("keyup", (e) => {
      if (e.target.tagName === "INPUT") {
        this.state = { ...this.state, title: e.target.value };
      } else if (e.target.tagName === "TEXTAREA") {
        this.state = { ...this.state, content: e.target.value };
      }
      this.state.tempUpdatedAt = new Date().toISOString();

      setEditingPostData(this.state.id, this.state);
      this.debounce();
    });
  };

  this.render = () => {
    $div.innerHTML = `
      <input type="text" value="${this.state.title ? this.state.title : ""}" />
      <textarea>${this.state.content ? this.state.content : ""}</textarea>
    `;
  };

  this.init();
}

const debounce = (callback, delay) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, delay);
  };
};
