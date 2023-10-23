import { request } from "../../library/api.js";
import { push } from "../../library/router.js";
import RootList from "./RootList.js";
export default function RootContainer({
  $target,
  initialState,
  onRenderDoc,
  onAddDoc,
}) {
  this.setState = (nextState) => {
    this.state = nextState;
    rootList.setState(this.state);
  };
  const $page = document.createElement("div");
  $page.className = "RootContainer";
  $target.appendChild($page);

  const fetchNewPost = async () => {
    const res = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify({
        title: "",
        parent: "",
      }),
    });
    return res;
  };

  this.state = initialState;
  const rootList = new RootList({
    $page,
    initialState,
    onClick: async (documentId) => {
      //DocumentRoot에서 받아서
      //const doc = await fetchDoc(documentId); //App에 doc정보 보내줘
      onRenderDoc(documentId); //이제 onRender보내주고 push를 해야해 클릭한 id가 올라감
    },

    addNewDoc: async () => {
      const res = await fetchNewPost(); //새 포스트 불러서 res받고
      //await fetchRoot(); //루트를 새로 렌더링해주고
      //const doc = await fetchDoc(res.id); //받은 res.id로 fetchDoc으로 다시 res받고
      //documentContainer.setState(doc); //그 res(doc)으로 docContainer를 setState해줌
      push(res.id); //push 하면 rerender 되게 해서 위 코드들 주석처리
    },
  });
}
