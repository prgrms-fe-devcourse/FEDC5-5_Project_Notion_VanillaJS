import Editor from "../components/Editor.js";

export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement("div");
  $target.appendChild($page);

  new Editor({ $target: $page, initialState });
}
