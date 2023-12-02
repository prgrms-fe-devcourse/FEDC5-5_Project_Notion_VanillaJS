import "@/styles/index.scss";

import { createComponent } from "./core";
import App from "./App";

export function render() {
  const $app = document.getElementById("app");

  if (!$app) {
    document.body.innerHTML = "애플리케이션을 불러오는 데 문제가 발생했습니다.";

    throw new Error("애플리케이션을 불러오는 데 문제가 발생했습니다.");
  }

  const componentInstance = createComponent(App);
  $app.innerHTML = componentInstance.element;
  componentInstance.bindEvents?.();
}

window.addEventListener("popstate", () => {
  render();
});

window.addEventListener("navigate", () => {
  render();
});

render();
