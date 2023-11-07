import { push } from "../../router/router.js";

export default function Header({ $target, title }) {
  const $div = document.createElement("div");
  $div.id = "header";
  const $p = document.createElement("p");
  $p.className = "header-title";
  $p.innerText = title;
  $div.appendChild($p);
  $target.appendChild($div);

  $p.addEventListener("click", (e) => {
    push("/");
  });
}
