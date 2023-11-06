import Layout from "./components/common/Layout.js";
import Sidebar from "./views/Sidebar.js";

import { SIDEBAR_VIEW_MODE } from "./utils/constants.js";

/**
 * @description 루트 컴포넌트
 */
export default function App({ $app, initState }) {
  // router 변화와 독립적으로 랜더링 되는 컴포넌트는 App 의 자식 컴포넌트이다.
  // 이는 사이드바, 모딜, 팝업, 서브윈도우 등의 독립 UI 들이 해당한다.
  const sidebar = new Sidebar({ $parent: $app });

  // 추후 sidebar view 모드 변경이 필요한 경우 usePublisher hook 을 통해 처리
  sidebar.setState({
    sidebarViewMode:
      sidebar?.state?.sidebarViewMode ?? SIDEBAR_VIEW_MODE.DOCS_INDEX_VIEWER,
  });

  new Layout({ $app });
}
