import { request } from "../../library/api.js";
import { push } from "../../library/router.js";
import Title from "./Title.js";
import RootList from "./RootList.js";
export default function RootContainer({
  $target,
  initialState,
  onRenderDoc,
  onAddDoc,
}) {
  this.setState = (nextState) => {
    this.state = nextState;
    title.render();
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

  const fetchSiblingPost = async (id) => {
    const res = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify({
        title: "",
        parent: id,
      }),
    });
    return res;
  };

  this.state = initialState;

  const title = new Title({
    $page,
  });

  const rootList = new RootList({
    $page,
    initialState,
    onClick: async (documentId) => {
      onRenderDoc(documentId); //낙관적 업데이트
      push(documentId);
    },

    addNewDoc: async () => {
      const res = await fetchNewPost();
      push(res.id);
    },

    addSibling: async (id) => {
      const res = await fetchSiblingPost(id);
      console.log("adS", res);
      push(res.id);
    },
  });
}
