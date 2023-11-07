import { addNewData } from "../../api/Api.js";
import { push } from "../../router/router.js";
import { setItem } from "../../storage/Storage.js";
import { SELECTED_POST_KEY } from "../post_leftside/PostList.js";

// 새 페이지 추가 버튼을 클릭 시
export default async function NewpageButtonEvent() {
  const newData = await addNewData(null);
  setItem(SELECTED_POST_KEY, newData.id);
  push(newData.id);
}
