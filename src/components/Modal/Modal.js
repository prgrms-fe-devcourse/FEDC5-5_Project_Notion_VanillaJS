import "./modal.css";
import { $ } from "../../utils/DOM/selector.js";
import { setItem, removeItem } from "../../utils/storage";
import { updatePost } from "../../utils/service/api";
import { navigate } from "../../utils/router";
import Editor from "../Editor/Editor";
import cancelIcon from "../../img/cancel.png";
export default function Modal({ $target, initialState, displayModal }) {
  const $modal = document.createElement("div");
  $modal.innerHTML = `
  <div class="modal hidden">
  <div class="modal__background"></div>
  <div class="modal__content">
  <div class="modal__header" >
    <p>새로운 문서 추가</p>
    <img src="${cancelIcon}" class="cancel-btn"/>
  </div>
  <div class="editor-container" ></div>
  </div>
  </div>`;

  $target.appendChild($modal);

  this.state = initialState;

  const $editorTarget = $(".editor-container");

  // Editor 추가하기
  let timer = null;
  let postLocalSaveKey = `temp-document-${this.state.id}`;

  const modalEditor = new Editor({
    $target: $editorTarget,
    initialState: this.state,
    onEditing: post => {
      // 즉시 임시 저장
      setItem(postLocalSaveKey, {
        ...this.state,
        ...post,
        tempSaveDate: new Date(),
      });

      // 이벤트 디바운싱
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        await updatePost(this.state.id, post);
        //console.log("자동 저장 완료");
        removeItem(postLocalSaveKey);
        navigate(`/documents/${this.state.id}`);
      }, 300);
    },
  });

  this.setState = nextState => {
    this.state = nextState;
    postLocalSaveKey = `temp-document-${this.state.id}`;

    this.render();
  };

  this.render = () => {
    modalEditor.setState(this.state);
  };

  this.render();

  /** 모달 닫기 */
  $modal.addEventListener("click", e => {
    const { className } = e.target;

    if (className == "modal__background" || className == "cancel-btn") {
      displayModal();
    }
  });
}
