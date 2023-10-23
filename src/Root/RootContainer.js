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
      onRenderDoc(documentId);
      push(documentId);
    },

    addNewDoc: async () => {
      const res = await fetchNewPost();
      push(res.id);
    },
  });
}
