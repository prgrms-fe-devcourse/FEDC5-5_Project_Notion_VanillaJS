import { addNewData } from "../../api/Api.js";
import { push } from "../../router/router.js";
import { getItem, setItem } from "../../storage/Storage.js";
import {
  OPENED_POST_KEY,
  SELECTED_POST_KEY,
} from "../post_leftside/PostList.js";

// 추가 버튼 클릭 시
export default async function InsertButtonEvent(id) {
  const newData = await addNewData(id);
  const showLists = getItem("showId", []);
  const newIdLists = [...showLists, newData.id];
  // 로컬스토리지를 통해 추가된 post가 선택되도록 처리
  setItem(OPENED_POST_KEY, newIdLists);
  // 로컬스토리지를 통해 추가된 post가 open되어 보이게 처리
  setItem(SELECTED_POST_KEY, parseInt(newData.id));
  push(newData.id);
}
