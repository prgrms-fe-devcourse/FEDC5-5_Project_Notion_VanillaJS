import { request } from "../../library/api.js";
import { changeRootTitle } from "../../library/titleChanger.js";
export default function Editor({ $page, initialState, onEdit }) {
  this.state = initialState;

  const handleKeyUp = async (e) => {
    const name = e.target.name; //타겟이 제목인지 내용인풋인지
    const nextState = {
      ...this.state,
      [name]: e.target.value,
    }; //nextState를 keyup있을 때마다 실시간으로 바꿔주는데
    if (name === "title" && e.target.value === "") {
      //제목이 없으면 제목없음으로 하는 예외처리
      nextState.title = "제목없음";
    }
    this.setState(nextState);
    await fetchEditDoc(nextState);
    changeRootTitle(this.state); //root에 제목변화 반영해주자.
  };

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
    //console.log("EditorState", this.state);
  };
  // let isInit = false;

  this.render = () => {
    if (this.state.title === "제목없음") {
      $page.innerHTML = `
        <input type="text" name="title" style="width:93%; height:5%; margin:20px;" placeholder="제목을 입력하세요">
        <textarea name="content" style="width:93%; height:70%; margin:20px;">${this.state.content}</textarea>
      `;
    } else {
      $page.innerHTML = `
        <input type="text" class="input-title" name="title" style="width:93%; height:5%; margin:20px;" value="${this.state.title}">
        <textarea name="content" style="width:93%; height:70%; margin:20px;">${this.state.content}</textarea>
      `;
    }
    // isInit = true;
  };

  //if문이 어딘가에 있고 명령어에 따라 마크업 태그를 JSON으로 변환해서
  $page.addEventListener("keyup", (e) => handleKeyUp(e));
}
