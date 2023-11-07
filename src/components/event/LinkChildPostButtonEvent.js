import { push } from "../../router/router.js";
import { setItem } from "../../storage/Storage.js";
import { SELECTED_POST_KEY } from "../post_leftside/PostList.js";

// 편집기 아래의 링크를 클릭 시 해당 post 화면 보여주도록 처리
export default function LinkChildPostButtonEvent(id) {
  // 링크를 통해 이동한 post가 선택되어 보이게 처리
  setItem(SELECTED_POST_KEY, parseInt(id));
  push(id);
}
