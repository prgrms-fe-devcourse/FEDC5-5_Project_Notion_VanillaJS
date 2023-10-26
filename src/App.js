import { request } from "./api.js";
import PostListPage from "./pages/PostListPage.js";
import PostViewPage from "./pages/PostViewPage.js";

export default function App({ $target }) {
  /* 
    {
      postListPage: [post]
      postViewPage: {
        id: number || new
        post: {
          title: string
          content: string
        }
      }
    }
  */
  this.state = {
    postListPage: [],
    postViewPage: {
      id: "",
      post: {
        title: "",
        content: "",
      },
    },
  };

  this.setState = (nextState) => {
    this.state = nextState;
    postViewPage.setState(this.state.postViewPage);
    postListPage.setState(this.state.postListPage);
  };

  const postListPage = new PostListPage({
    $target,
    initialState: this.state.postListPage,
    onPostClick: async (id) => {
      if (id === "undefined") return;
      history.pushState(null, null, `/posts/${id}`);
      this.route();
    },
    onAddPostClick: async () => {
      history.pushState(null, null, "/posts/new");
      await this.route();
      this.setState({
        ...this.state,
        postListPage: [
          ...this.state.postListPage,
          { title: "제목 없음", documents: [] },
        ],
      });
    },
    onPostSubClick: async (classType, id) => {
      if (id === "undefined") return;
      if (classType === "addPost") {
        const createdPost = await request("/documents", {
          method: "POST",
          body: JSON.stringify({
            title: "",
            parent: id,
          }),
        });
        history.pushState(null, null, createdPost.id);
      }

      if (classType === "removePost") {
        await request(`/documents/${id}`, {
          method: "DELETE",
        });
        history.pushState(null, null, "/");
      }

      const postArr = await request("/documents");
      this.setState({ ...this.state, postListPage: postArr });
      this.route();
    },
  });

  let timer = null;
  const postViewPage = new PostViewPage({
    $target,
    initialState: this.state.postViewPage,
    onEditing: (post) => {
      if (timer !== null) clearTimeout(timer);

      timer = setTimeout(async () => {
        const isNew = this.state.postViewPage.id === "new";
        if (isNew) {
          const createdPost = await request(`/documents`, {
            method: "POST",
            body: JSON.stringify({
              title: post.title,
              parent: null,
            }),
          });
          history.replaceState(null, null, `/posts/${createdPost.id}`);
          this.route();
        } else {
          await request(`/documents/${this.state.postViewPage.id}`, {
            method: "PUT",
            body: JSON.stringify({
              title: post.title,
              content: post.content,
            }),
          });

          this.route();
        }
      }, 1000);
    },
  });

  this.route = async () => {
    const { pathname } = window.location;
    const postArr = await request("/documents");
    this.setState({ ...this.state, postListPage: postArr });

    if (pathname === "/") {
      this.setState({
        ...this.state,
        postViewPage: {
          id: "root",
          post: { id: "root", title: "", content: "" },
        },
      });
      return;
    }

    if (pathname.indexOf("/posts/") === 0) {
      const [, , id] = pathname.split("/");
      if (id === "new") {
        this.setState({
          ...this.state,
          postViewPage: { id: "new", post: { title: "", content: "" } },
        });
        return;
      }

      const post = await request(`/documents/${id}`);
      this.setState({ ...this.state, postViewPage: { id, post } });
    }
  };

  this.route();
}
