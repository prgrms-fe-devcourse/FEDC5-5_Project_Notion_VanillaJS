import PostList from "../PostList.js";

export default function PostListPage({
  $target,
  initialState,
  onPostClick,
  onAddPostClick,
  onPostSubClick,
}) {
  const $header = document.createElement("h1");
  const $page = document.createElement("div");
  $page.classList.add("post-list-page");

  $page.appendChild($header);
  $target.appendChild($page);

  $header.innerText = "🔥 Sangmin의 노션";

  /* 
    [{ title: string }]
  */
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    postList.setState(this.state);
    this.render();
  };

  const postList = new PostList({
    $target: $page,
    initialState: this.state,
    onPostClick,
    onAddPostClick,
    onPostSubClick,
  });

  this.render = () => {};
  this.render();
}
