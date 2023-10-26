import "./footer.css";
import { navigate } from "../../utils/router";

export default function Footer({ $target, initialState }) {
  this.state = initialState;

  const $footer = document.createElement("div");
  $footer.className = "footer";

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.state) {
      $footer.innerHTML = "";
      return;
    }

    $footer.innerHTML = `
      ${this.state
        .map(
          document =>
            `<p data-id="${document.id}" class="sub-document">${
              document.title || "제목 없음"
            }</p>`,
        )
        .join("")}`;

    $target.appendChild($footer);
  };

  $footer.addEventListener("click", e => {
    const $documentLink = e.target.closest(".sub-document");

    if ($documentLink) {
      const { id } = $documentLink.dataset;
      navigate(`/documents/${id}`);
    }
  });
}
