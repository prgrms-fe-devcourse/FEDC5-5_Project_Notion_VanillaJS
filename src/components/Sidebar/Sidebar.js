import "./sidebar.css";
import { $ } from "../../utils/DOM/selector.js";
import { navigate } from "../../utils/router";
import { deletePost } from "../../utils/service/api";

import PostList from "./PostList.js";

import { toggleOff, toggleOn } from "../../utils/DOM/ToggleControl";
import { deleteDocument } from "../../utils/DOM/ListControl";

import profile from "../../img/profile.png";

export default function Sidebar({ $target, initialState, onAddNewDocument }) {
  const $sidebar = document.createElement("div");
  $sidebar.className = "sidebar";
  $sidebar.innerHTML = `
  <div class="profile-container"><img src="${profile}"/>maru의 Notion</div>
  <div class="sidebar-element search-container"><img src=""/>검색</div>
  <div class="sidebar-element update-container"><img src=""/>업데이트</div>
  <div class="sidebar-element setting-container"><img src=""/>설정과 멤버</div>
  <div class="sidebar-element add-root-btn"><img src=""/> 새 페이지  &nbsp;&nbsp;+</div>
  <div class="document-list-container"></div>
  `;
  $target.appendChild($sidebar);

  this.state = initialState;

  const $documnetListContainer = $(".document-list-container");

  const postList = new PostList({
    $target: $documnetListContainer,
    initialState: this.state,
    onToggle: id => {
      const $toggled = $(`[data-id='${id}']`);
      $toggled.className.includes("toggled") ? toggleOff(id) : toggleOn(id); // 토글 열고닫기
    },
    onSelect: id => {
      navigate(`/documents/${id}`);
    },
    onAddNewDocument,
    onRemove: async ($deleteTarget, id) => {
      try {
        await deletePost(id);
        deleteDocument($deleteTarget, id); // 사이드바 문서 dom 즉시 삭제
        navigate("/");
      } catch (err) {
        alert("삭제 실패");
      }
    },
  });

  this.setState = nexState => {
    this.state = nexState;
    postList.setState(this.state);
  };

  $sidebar.addEventListener("click", e => {
    const { className } = e.target;
    if (className.includes("add-root-btn")) {
      onAddNewDocument(null); // 새로운 root 문서 생성
    }
  });
}
