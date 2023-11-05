import { deletePage, insertPage, request, getPage, updatePage } from "./API/API.js";
import Menubar from "./Components/Menubar/Menubar.js";
import PageViewer from "./Components/PageViewer/PageViewer.js";
import { getStorage, isCheckedToggled, removeStorage, setStorage, setToggleList } from "./LocalStorage/LocalStorage.js";
import { validateListProps, validatePageProps } from "./Function/PropValidation.js";
import { makeRouterEvent, pushRouter } from "./Router/Router.js";
import HelpButton from "./Components/HelpCard/HelpButton.js";
import HelpCard from "./Components/HelpCard/HelpCard.js";
import debounce from "./Function/debounce.js";

export default function App({ target }) {
  /* App 생성 정보 */
  const appElement = document.createElement("section");
  target.appendChild(appElement);
  appElement.setAttribute("class", "app");

  /* PageList 호출 */
  const getPageList = async (url) => {
    const lists = await request(url);
    /* 유효성 검사 */
    if (validateListProps(lists)) {
      /* 리스트 상태 변경 */
      menubar.setState(lists);
    }
  };

  /* Page 호출후 local과 비교 검사 */
  const getChechkedPage = async (id) => {
    /* 호출 */
    const apiPage = await getPage(id);
    const localPage = getStorage(id);

    /* 로컬 vs API 비교 */
    if (
      localPage &&
      localPage.updatedAt > apiPage.updatedAt &&
      confirm("저장에 성공하지 못한 이전 내용이 존재합니다! 불러오시겠나요 ✏️")
    ) {
      return localPage;
    }
    return apiPage;
  };

  /* 렌더링 */
  const menubar = new Menubar({
    target: appElement,
    state: [],
    onEvent: async (params) => {
      const { id } = params;

      /* delete */
      if (params.delete) {
        /* 삭제후 리스트 상태변경 */
        await deletePage(id);
        getPageList("/documents");

        /* is Toggle ? => remove localToggle data */
        if (isCheckedToggled(id)) {
          removeStorage(id);
        }
        /* 현재 보고 있는 페이지에 대한 삭제 처리 */
        const { pathname } = window.location;
        const idInPath = pathname.split("/")[2];

        if (idInPath && idInPath === id) {
          makeRouterEvent({ url: "/", event: "push" });
        }
      }

      /* insert */
      if (params.insert) {
        const newPage = await insertPage({
          title: "제목 없음",
          parent: id,
        });

        if (!isCheckedToggled(id)) {
          setToggleList(id);
        }
        /* 리스트 상태 업데이트 */
        await getPageList("/documents");

        /* new Page Route 이동 */
        makeRouterEvent({ url: `/documents/${newPage.id}`, event: "push" });
      }
    },
  });

  const pageViewer = new PageViewer({
    target: appElement,
    state: {
      id: "Index",
    },

    /* 디바운스 */
    onEditing: debounce(async (params) => {
      const { id } = params;
      /* local 저장 */
      setStorage(params);

      const res = await updatePage(params);

      if (res.id === id) {
        removeStorage(id);
      }
      await getPageList("/documents");
    }, 300),
  });

  this.route = async () => {
    const { pathname } = window.location;

    /* IndexPage */
    if (pathname === "/") {
      pageViewer.setState({ id: "Index" });
    }

    if (pathname.indexOf("/documents/") === 0) {
      const id = pathname.split("/")[2];

      // 해당 조건 처리가 맞을까
      if (id) {
        const page = await getChechkedPage(id);
        /* 유효성 검사 */
        if (validatePageProps(page)) {
          pageViewer.setState(page);
        }
      }
    }
  };

  /* 사용 가이드 */
  const helpCard = new HelpCard({
    target: appElement,
  });

  /* 가이드 토글 버튼 */
  new HelpButton({
    target: appElement,
    onClick: () => {
      helpCard.setState();
    },
  });

  pushRouter(() => this.route());
  getPageList("/documents");
  this.route();
}
