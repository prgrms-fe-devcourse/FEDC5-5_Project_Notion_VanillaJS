import PostsPage from "./PostsPage.js";
import PostEditPage from "./PostEditPage.js";

// /posts/{id} -> id에 해당하는 post 생성
// /posts/new -> 새 post 생성
export default function App({ $target }) {
  const postsPage = new PostsPage({ $target });
  const postEditPage = new PostEditPage({
    $target,
    initialState: { postId: "new", post: { title: "", content: "" } },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      postsPage.render();
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
    }
  };

  this.route();

  // nextUrl이 유효할 때만 라우팅 처리
  // route가 매번 호출 되는 것을 방지
  window.addEventListener("route-change", (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      this.route();
    }
  });
}
