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
  const $page = document.createElement("div");
  $page.className = "RootContainer";
  $target.appendChild($page);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    title.render();
    rootList.setState(this.state);
  };

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

    addSubDoc: async (id) => {
      const res = await fetchSubPost(id);
      console.log("adS", res);
      push(res.id);
    },
    deleteDoc: async (id) => {
      await fetchDelete(id);
      push("");
    },
  });

  const fetchNewPost = async () => {
    const res = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify({
        title: "제목없음",
        parent: "",
      }),
    });
    return res;
  };

  const fetchSubPost = async (id) => {
    const res = await request(`/documents`, {
      method: "POST",
      body: JSON.stringify({
        title: "제목없음",
        parent: id,
      }),
    });
    return res;
  };

  const fetchDelete = async (id) => {
    const res = await request(`/documents/${id}`, {
      method: "DELETE",
    });
  };
}
