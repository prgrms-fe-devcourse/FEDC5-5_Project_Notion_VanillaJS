import { addNewData } from "../../api/Api.js";
import { push } from "../../router/router.js";
import { getItem, setItem } from "../../storage/Storage.js";
import {
  OPENED_POST_KEY,
  SELECTED_POST_KEY,
} from "../post_leftside/PostList.js";

// 편집기 하단의 새로운 하위 post 추가 버튼 클릭 시 
export default async function CreateChildPostButtonEvent(id) {
  const newData = await addNewData(id);
  const showLists = getItem(OPENED_POST_KEY, []);
  const newIdLists = [...showLists, newData.id];
  setItem(OPENED_POST_KEY, newIdLists);

  showLists.push(newData.id);
  setItem(SELECTED_POST_KEY, newData.id);
  setItem(OPENED_POST_KEY, showLists);
  push(newData.id);
}
