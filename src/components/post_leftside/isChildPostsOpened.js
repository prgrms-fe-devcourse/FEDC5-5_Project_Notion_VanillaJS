import { getItem } from "../../storage/Storage.js";
import { OPENED_POST_KEY } from "./PostList.js";

// showLists에 화면에 보여져야 하는 li의 id가 담겨있고,
// 인수로 전달받은 id가 showLists에 포함되어있는지 체크한다.
export default function isChildPostsOpened(id) {
  const showLists = getItem(OPENED_POST_KEY, []);

  return showLists.includes(parseInt(id));
}
