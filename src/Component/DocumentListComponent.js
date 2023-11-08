import DocumentList from "../Pages/DocumentList.js";
import Header from "../Pages/Header.js";
import { request } from "../api/api.js";
import { USER_NAME } from "../env/apiIgnore.js";
/*
  토글된 아이디들을 저장 - 하지만 
  [
    {
      parentId: "~"
      id:"~~"
    }
  ]

*/

export default function DocumentListComponent({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.style.height = "100%";

  this.state = initialState;
  $target.appendChild($page);

  this.setState = async () => {
    const lists = await request("/documents");

    const toggleData = this.state.toggleData;

    documentDepth(lists, toggleData);

    documentList.setState({
      selectedDocument: null,
      documentList: lists,
    });
  };

  const header = new Header({
    $target: $page,
    initialState: { userName: USER_NAME },
  });

  const documentList = new DocumentList({
    $target: $page,
    onToggle: (parentId, id) => {
      //this.state.toggleData가 중복되는데 변수로 바꿔서하면 오류가 남 -> 해결책 찾기
      let hasToggle = checkToggle(this.state.toggleData, id);

      //토글이 되었다면
      if (hasToggle) {
        //해당 되는 부모만 닫아줌으로써 하위 문서들도 안보이게된다 -> 하위 문서들은 isToggle이 true로 존재하게 됨 -> 해결책 찾기
        this.state.toggleData = this.state.toggleData.filter(
          (el) => el.parentId !== parentId
        );
      } else {
        this.state.toggleData = [...this.state.toggleData, { parentId, id }];
      }
    },
  });

  //API요청으로 가져온 documents데이터에 isToggle데이터 추가
  const documentDepth = (list, toggleData) => {
    list.forEach((item) => {
      const { id, documents } = item;
      const hasToggle = toggleData ? checkToggle(toggleData, id) : false;
      item.isToggle = hasToggle;

      if (documents) {
        documentDepth(documents, toggleData);
      }
    });
  };

  //현재 toggle된 id가 모여있는 배열에서 체크할 id가 있는지
  const checkToggle = (toggleData, id) => {
    let hasToggle = false;
    for (const { parentId: toggleParentId, id: toggleId } of toggleData) {
      if (toggleId === id.toString()) {
        hasToggle = true;
        break;
      }
    }
    return hasToggle;
  };
}
