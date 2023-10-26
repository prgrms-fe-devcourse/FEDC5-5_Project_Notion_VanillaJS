import Editor from "../Editor.js";

export default function PostViewPage({ $target, initialState, onEditing }) {
  const $page = document.createElement("div");
  $page.className = "post-view-page";

  $target.appendChild($page);

  /* 
    {
      id: num || "new"
      post: {
        title: string,
        content: string,
      }
    }
  */
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    editor.setState(this.state.post);
    this.render();
  };

  const editor = new Editor({
    $target: $page,
    initialState: this.state.post,
    onEditing,
  });

  this.render = () => {};
  this.render();
}
