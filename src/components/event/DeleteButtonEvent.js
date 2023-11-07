import { deleteData } from "../../api/Api.js";
import { push } from "../../router/router.js";
import { getItem, setItem } from "../../storage/Storage.js";
import { OPENED_POST_KEY } from "../post_leftside/PostList.js";

// 삭제 버튼 클릭 시
export default async function DeleteButtonEvent(id) {
  const showLists = getItem(OPENED_POST_KEY, []);
  // 삭제된 post의 id를 로컬스토리지에서 지운다
  const newIdLists = showLists.filter((openedId) => openedId !== parseInt(id));

  setItem(OPENED_POST_KEY, newIdLists);
  await deleteData(id);
  push("");
}
