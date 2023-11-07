import { setItem } from "../../storage/Storage.js";
import { push } from "../../router/router.js";
import { SELECTED_POST_KEY } from "../post_leftside/PostList.js";

// post 선택 버튼 클릭 시
export default function SelectPostEvent(id) {
  setItem(SELECTED_POST_KEY, parseInt(id));
  push(id);
}
