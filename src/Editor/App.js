import Editor from "./Editor.js";
import { HTTPRequest } from "../Util/Api.js";
import { setItem } from "../Util/Storage.js";

// Editor 폴더의 App
export default function App({ $target, initialState }) {
  const LOCAL_STORAGE_KEY = "PostID-";
  const $editor = document.createElement("div");
  // 편집기 최상위 DOM의 클래스 설정
  $editor.setAttribute("class", "editor");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    editor.setState(this.state);
  };

  // 디바운스를 위한 타이머 아이디 초기화
  let timerId = null;

  // 에디터 컴포넌트
  const editor = new Editor({
    $target: $editor,
    initialState,
    // title을 서버에 저장
    titlePost: async (title, id) => {
      await fetchData(id, {
        method: "PUT",
        body: JSON.stringify({
          title,
        }),
      });
    },
    // content을 서버에 저장
    EditPost: async (title, content, id) => {
      // 제목, 내용, id, 현재 시간 로컬에 저장
      setItem(LOCAL_STORAGE_KEY + id, {
        title,
        content,
        id,
        RecentlyAt: new Date(),
      });

      // 디바운스 -> 2초 이내에 입력된 값들은 HTTP 요청 X
      if (timerId !== null) clearTimeout(timerId);

      timerId = setTimeout(async () => {
        await fetchData(id, {
          method: "PUT",
          body: JSON.stringify({
            title,
            content,
          }),
        });

        console.log("받은 데이터 :", title, content, id);
      }, 2000);
    },
  });

  // HTTP request
  const fetchData = async (url, payload = {}) => {
    const data = await HTTPRequest(`/${url}`, payload);

    return data;
  };

  this.render = () => {
    $target.appendChild($editor);
  };

  this.render();
}
