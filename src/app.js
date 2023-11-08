import SideAreaRender from "./sidearea/sideAreaRender.js";
import TextAreaRender from "./textarea/textAreaRender.js";
import { request } from "./utils/api.js";

const $ = document;
export default function App({ $target }) {
  /**
   * wrapper, state 선언부
   */
  const $sideBarWrapperDiv = $.createElement("div");
  const $textAreaWrapperDiv = $.createElement("div");
  $sideBarWrapperDiv.className = "sideBarWrapper";
  $textAreaWrapperDiv.className = "textAreaWrapper";

  this.state = [
    {
      id: 0,
      title: "",
      documents: [],
      createdAt: "",
      updatedAt: "",
    },
  ];

  this.setState = (nextState) => {
    this.state = nextState;
  };

  $target.appendChild($sideBarWrapperDiv);
  $target.appendChild($textAreaWrapperDiv);

  /**
   * 하위 렌더링 페이지 선언부
   */
  // 사이드 바 렌더링
  const sideAreaRender = new SideAreaRender({
    $target: $sideBarWrapperDiv,
    initialState: this.state,
    onClickPage: (id) => {
      fetchSelectedDocs(id);
    },
    onClickCreateNewPageButton: async (id) => {
      const newPageLog = await createNewPage("/documents", id);
      await fetchRootDocs();
      if (!id) {
        const scrollMover = $.querySelector(".sideBarPageList");
        scrollMover.scrollTop = scrollMover.scrollHeight;
      }
      await fetchSelectedDocs(newPageLog.id);
      history.pushState(null, null, `/documents/${newPageLog.id}`);
      $.querySelector(".textArea-title").focus();
    },
    onClickDeleteButton: async (id) => {
      const deleteResult = await deletePage(id);
      await fetchRootDocs();

      //일단 가장 가까운 페이지로 이동하도록 처리
      if (deleteResult.parent.id === undefined) {
        let temp = [Infinity, 0];
        for (const value of this.state) {
          if (Math.abs(value.id - id) < temp[0]) {
            temp[0] = Math.abs(value.id - id);
            temp[1] = value.id;
          }
        }
        await fetchSelectedDocs(temp[1]);
        history.pushState(null, null, `/documents/${temp[1]}`);
        $.querySelector(".textArea-title").focus();
      } else {
        await fetchSelectedDocs(deleteResult.parent.id);
        history.pushState(null, null, `/documents/${deleteResult.parent.id}`);
        $.querySelector(".textArea-title").focus();
      }
    },
    onReturnMainPage: async () => {
      history.pushState(null, null, "/");
      textAreaRender.setState({
        title: "👋안녕하세요!",
        content:
          "Notion Cloning by KSJ 페이지에 오신 것을 환영합니다.\n이 페이지는 수정이 불가능해요.\n좌측에서 페이지를 선택해서 편집을 진행해주세요!",
        isLoading: false,
        pageType: "ROOT",
      });
    },
  });

  // 텍스트 에디터 렌더링
  let timerForText = null;
  let timerForTitle = null;
  const textAreaRender = new TextAreaRender({
    $target: $textAreaWrapperDiv,
    initialState: {
      title: "",
      content: "",
      isLoading: false,
      pageType: "INIT", // INIT, ROOT, NOT_ROOT
    },
    onTextEditing: async (id, title, target) => {
      if (timerForText !== null) {
        clearTimeout(timerForText);
      }
      timerForText = setTimeout(async () => {
        await request(`/documents/${id}`, {
          method: "PUT",
          body: JSON.stringify({ title: title, content: target }),
        });
        $.querySelector(".textArea-content").focus();
      }, 500);
    },
    onTitleEditing: async (id, content, target, key) => {
      if (timerForTitle !== null) {
        clearTimeout(timerForTitle);
      }
      if (key === "Enter") {
        const modifyTextPageTitle = await request(`/documents/${id}`, {
          method: "PUT",
          body: JSON.stringify({ title: target.value, content: content }),
        });
        await fetchRootDocs();
        $.querySelector(".textArea-content").focus();
      } else {
        timerForTitle = setTimeout(async () => {
          const modifyTextPageTitle = await request(`/documents/${id}`, {
            method: "PUT",
            body: JSON.stringify({ title: target.value, content: content }),
          });
          await fetchRootDocs();
          $.querySelector(".textArea-title").focus();
        }, 200);
      }
    },
    onClickChildPage: async (id) => {
      history.pushState(null, null, `/documents/${id}`);
      await fetchSelectedDocs(id);
    },
  });

  /**
   * App에서 사용되는 함수 목록 선언부
   */

  const deletePage = async (id) => {
    const deleteRequest = await request(`/documents/${id}`, {
      method: "DELETE",
    });
    return deleteRequest;
  };

  // 새로운 글을 post하는 함수
  const createNewPage = async (url, parentTag) => {
    // const createdDefaultTitleText = "새 페이지";
    const createdDefaultTitleText = "";
    const createdDefaultParent = parentTag ? parentTag : "null";
    const newPageRes = await request(url, {
      method: "POST",
      body: JSON.stringify({
        title: createdDefaultTitleText,
        parent: createdDefaultParent,
      }),
    });
    return newPageRes;
  };

  // x-username에 해당하는 전체 문서 불러오는 API request function
  const fetchRootDocs = async () => {
    const rootDocsRespond = await request(`/documents`);
    this.setState(rootDocsRespond);
    sideAreaRender.setState(rootDocsRespond);
  };

  const fetchSelectedDocs = async (id) => {
    textAreaRender.setState({ ...textAreaRender.state, isLoading: true });
    const nowDocsId = id;
    if (nowDocsId !== 0) {
      const selectedDocs = await request(`/documents/${nowDocsId}`);

      if(selectedDocs){
        textAreaRender.setState({
          ...selectedDocs,
          isLoading: false,
          pageType: "NOT_ROOT",
        });
      }else{
        alert(`올바르지 않은 접근입니다! 메인화면으로 이동합니다!!`);
        textAreaRender.setState({
          title: "👋안녕하세요!",
          content:
            "Notion Cloning by KSJ 페이지에 오신 것을 환영합니다.\n이 페이지는 수정이 불가능해요.\n좌측에서 페이지를 선택해서 편집을 진행해주세요!",
          isLoading: false,
          pageType: "ROOT",
        });
        history.pushState(null, null, `/`);
      }
    } else {
      console.error(
        `nowDocsId의 값이 비어있거나 숫자가 아닙니다!! nowDocsId === ${nowDocsId}`
      );
    }
  };

  /**
   * 라우팅 처리 선언부
   */
  this.route = async () => {
    const { pathname } = location;
    if (pathname === "/") {
      // 루트인 경우
      await fetchRootDocs();
      textAreaRender.setState({
        title: "👋안녕하세요!",
        content:
          "Notion Cloning by KSJ 페이지에 오신 것을 환영합니다.\n이 페이지는 수정이 불가능해요.\n좌측에서 페이지를 선택해서 편집을 진행해주세요!",
        isLoading: false,
        pageType: "ROOT",
      });
    } else if (pathname.indexOf("/documents/") > -1) {
      const [, , Id] = pathname.split("/");
      await fetchRootDocs();
      await fetchSelectedDocs(Id);
    } else {
      // 404처리
      console.log(pathname);
      $.querySelector("body").innerHTML = `
      <h1 style="display:block">404 Not Found!</h1>
      <span style="display:block">${pathname} 페이지는 존재하지 않습니다!!</span>
      <a style="display:block" href="/">다시 메인 화면으로 돌아가려면 클릭하세요</a>
      `;
    }
  };
  window.addEventListener("popstate", () => this.route());

  this.route();
}
