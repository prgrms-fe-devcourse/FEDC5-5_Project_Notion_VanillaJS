import Header from "../header_upside/Header.js";
import PostList from "../post_leftside/PostList.js";
import EditPage from "../edit_rightside/EditPage.js";
import { request, updateData } from "../../api/Api.js";
import { getItem } from "../../storage/Storage.js";
import { initRouter } from "../../router/router.js";

const NOTION_NAME = "📚 황 민호의 Notion";

export default function App({ $target }) {
  // 왼쪽 화면(postList)과 연결
  // const getPostListApi = async () => {
  //   const rootData = await request("");
  //   postList.setState(rootData);
  // };

  // 오른쪽 화면(editpage)과 연결
  // const getPostApi = async (id) => {
  //   const selectedData = await request(`/${id}`);
  //   if (selectedData) {
  //     const data = { ...selectedData, isRender: false };
  //     editpage.setState(data);
  //   }
  // };

  new Header({ $target, title: NOTION_NAME });

  const $editPage = document.querySelector("#edit-page");
  const editpage = new EditPage({
    $target: $editPage,
    initialState: {},
    onNewTitle: async (id) => {
      // 로컬에 저장된 title, content 불러옴
      const newTitle = getItem("savepoint", "");
      const { title, content } = newTitle;

      // post를 수정하기 위한 api 통신
      await updateData({ documentId: id, title, content });

      const nextState = await request("");
      // postlist도 리렌더 ( 편집기에서 수정한 제목이 side-bar에도 즉각적으로 반영 )
      postList.setState(nextState);
    },
  });

  const postList = new PostList({ $target });

  this.route = () => {
    const { pathname } = window.location;
    postList.getPostListApi();
    // // 초기 화면 렌더링
    // if (pathname === "/") {
    //   editpage.setState({ id: "index" });
    //   //특정 id를 가진 post 렌더링
    // } else if (pathname !== "/" && pathname.indexOf("/") === 0) {
    //   const id = pathname.split("/")[1];
    //   getPostApi(id);
    // } else {
    //   editpage.setState({ id: "index" });
    // }

    // 정규표현식 활용하여 구현
    switch (true) {
      case /^\/\d/.test(pathname):
        const id = pathname.split("/")[1];
        if (id) {
          editpage.getPostApi(id);
        }
        break;

      case /^\/$/.test(pathname):
        editpage.setState({ id: "index" });
        break;
      default:
        editpage.setState({ id: "index" });
        alert("잘못된 URL입니다.😭 \n홈 화면으로 이동합니다.");
        throw new Error("잘못된 URL입니다. \n홈 화면으로 이동합니다.");
    }
  };

  this.route();
  initRouter(() => this.route());
}
