import RichView from "./RichView.js";

import { getFlatSideBarData } from "../utils/storage.js";
import { putData } from "../utils/fetchData.js";
import { setEditingPostData, removeEditingPostData } from "../utils/storage.js";
import { debounce } from "../utils/debounce.js";

export default function Editor({
  $target,
  initalState,
  setSideBarState,
  editorId = "editor",
}) {
  const $div = document.createElement("div");

  $div.id = editorId;
  $target.appendChild($div);

  this.state = initalState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.setLinkPosts = (documentState) => {
    // deep copy
    const curDocumentState = JSON.parse(JSON.stringify(documentState));

    // flatSideBarData (플랫한 모든 문서 데이터)에서 title 이 포함된 단어를 찾아 리스트로 만듭니다.
    const foundedTitleInContent = getFlatSideBarData().filter((item) =>
      curDocumentState.content
        ? -1 !== curDocumentState.content.indexOf(item.title)
        : false
    );

    // 찾은 타이틀 중에 중복되는 타이틀을 제거하고 링크에 포함된 타이틀을 제거합니다.
    // ex) [post1](/documents/post1) => post1
    const tempLinkingPosts = foundedTitleInContent.reduce((acc, cur) => {
      if (["documents", ""].includes(cur.title)) return acc;
      if (foundedTitleInContent.some((item) => item.id === cur.title))
        return acc;
      if (acc.some((ac) => ac.title === cur.title)) return acc;
      else return [...acc, cur];
    }, []);

    // 타이틀 길이 순으로 정렬합니다.
    // 이유 - 길이가 긴 타이틀이 짧은 타이틀을 포함할 수 있기 때문입니다.
    // 링크가 중복되는 것을 방지합니다.
    tempLinkingPosts.sort((a, b) => {
      return a.title.length - b.title.length;
    });

    // 찾은 타이틀을 링크로 바꿔줍니다.
    const linkingPosts = tempLinkingPosts;
    if (linkingPosts) {
      linkingPosts.forEach((linkingPost) => {
        const link = `[${linkingPost.title}](/documents/${linkingPost.id})`;

        curDocumentState.content = curDocumentState.content.replaceAll(
          new RegExp(`(\\b${linkingPost.title}\\b)`, "g"),
          link
        );
      });
    }
    // richView 컴포넌트에 상태를 전달합니다.
    richView.setState(curDocumentState);
  };

  // debounce 를 사용하여 1초마다 서버에 데이터를 전달합니다.
  this.debounce = debounce(async () => {
    const body = {
      title: this.state.title,
      content: this.state.content,
    };
    const data = await putData(this.state.id, body);
    // sideBar 컴포넌트에 상태를 전달합니다.
    setSideBarState(data);
    // 서버에 데이터를 전달한 후에는 localStorage 에서 해당 데이터를 삭제합니다.
    removeEditingPostData(this.state.id);
  }, 1000);

  this.init = () => {
    // 키보드 입력 시에는 낙관적 업데이트를 위해 서버에 데이터를 전달하지않고
    // state 를 업데이트하고 localStorage 에 저장합니다.
    // debounce 를 사용하여 1초마다 서버에 데이터를 전달합니다.
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
      <textarea id="content" contentEditable="true" >${
        this.state.content ? this.state.content : ""
      }</textarea>
      `;
  };

  // richView 컴포넌트를 초기화합니다.
  const richView = new RichView({
    $target,
    initialState: this.state,
  });

  this.render();
  this.init();
}
