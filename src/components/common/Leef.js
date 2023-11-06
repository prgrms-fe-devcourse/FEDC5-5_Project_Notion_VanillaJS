import { LEEF_COMPONENT_RENDER_SCOPE } from "../../utils/constants.js";

export default function Leef({ $parent, data, onClick }) {
  const $element = document.createElement("div");
  $element.classList.add("leef");

  $parent.appendChild($element);

  this.render = () => {
    const {
      POSITION_MORE_THEN,
      POSITION_LESS_THEN,
      ROTATE_MORE_THEN,
      ROTATE_LESS_THEN,
    } = LEEF_COMPONENT_RENDER_SCOPE;

    // leef Component 의 위치 범위 지정 //
    const top =
      Math.floor(Math.random() * POSITION_LESS_THEN) + POSITION_MORE_THEN;
    const left =
      Math.floor(Math.random() * POSITION_LESS_THEN) + POSITION_MORE_THEN;
    const rotate =
      Math.floor(Math.random() * ROTATE_LESS_THEN) - ROTATE_MORE_THEN;

    $element.setAttribute(
      "style",
      `top: ${top}%; left: ${left}%; transform: rotate(${rotate}deg);`
    );

    $element.innerHTML = `
        <a class="leef-title">
            ${data}
        </a>
    `;
  };
  this.render();

  $element.addEventListener("click", onClick);
}
