import { getFlatSideBarData, isDataInLocalStorage } from "../utils/storage.js";
import { getData, putData } from "../utils/fetchData.js";
import { mdToHtml } from "../utils/mdToHtml.js";

import {
  getEditingPostData,
  setEditingPostData,
  removeEditingPostData,
} from "../utils/storage.js";
import RichView from "./RichView.js";

export default function Editor({ $target, initalState, setSideBarState }) {
  const $div = document.createElement("div");
  $div.id = "editor";
  $target.appendChild($div);

  this.state = initalState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.setLinkPosts = (state) => {
    const tempState = { ...state };
    const flatSideBarData = getFlatSideBarData().filter((item) =>
      tempState.content ? -1 !== tempState.content.indexOf(item.title) : false
    );

    const tempLinkingPosts = flatSideBarData.reduce((acc, cur) => {
      if (cur.title === "documents" || cur.title === "") return acc;
      if (flatSideBarData.some((item) => item.id === cur.title)) return acc;
      if (acc.some((ac) => ac.title === cur.title)) return acc;
      else return [...acc, cur];
    }, []);
    tempLinkingPosts.sort((a, b) => {
      return b.title.length - a.title.length;
    });
    const linkingPosts = tempLinkingPosts;
    if (linkingPosts) {
      linkingPosts.forEach((linkingPost) => {
        const link = `[${linkingPost.title}](/documents/${linkingPost.id})`;
        console.log(
          tempState.content.match(
            new RegExp(`\[.*${linkingPost.title}.*\]`, "g")
          ),
          tempState.content
        );
        if (
          tempState.content.match(
            new RegExp(`\[[^\]*${linkingPost.title}[^\]]*\]`, "g")
          )
        ) {
        } else {
          tempState.content = tempState.content.replaceAll(
            new RegExp(
              `(?!\[[^\]*${linkingPost.title}[^\]]*\])(${linkingPost.title})`,
              "g"
            ),
            link
          );
        }
      });
    }
    console.log(tempState.content, state.content);
    richView.setState(tempState);
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
      if (e.target.id === "title") {
        this.state = { ...this.state, title: e.target.value };
      } else if (e.target.id === "content") {
        this.state = { ...this.state, content: e.target.value };
      }
      this.state.tempUpdatedAt = new Date().toISOString();

      this.setLinkPosts(this.state);

      setEditingPostData(this.state.id, this.state);
      this.debounce();
    });
  };

  this.render = () => {
    if (!this.state) return;
    this.setLinkPosts(this.state);
    $div.innerHTML = `
      <input type="text" id="title" value="${
        this.state.title ? this.state.title : ""
      }" />
      <textarea id="content" contentEditable="true" style="width:600px;height:400px;border: 1px solid">${
        this.state.content ? this.state.content : ""
      }</textarea>
      `;
  };

  const richView = new RichView({
    $target,
    initialState: this.state,
  });
  this.render();
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
