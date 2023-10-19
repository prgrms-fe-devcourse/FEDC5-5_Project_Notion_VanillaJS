export default function DocumentContainer({ $target, initialState }) {
  const $page = document.createElement("div");
  $page.className = "DocumentContainer";
  $target.appendChild($page);
  $page.innerHTML = "DocumentContainer";
  console.log(initialState);
}
