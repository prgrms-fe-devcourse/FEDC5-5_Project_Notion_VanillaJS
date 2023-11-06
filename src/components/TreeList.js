export default function TreeList({ $container, child = {} }) {
  const $span = document.createElement("span");
  const $addButton = document.createElement("button");
  $addButton.textContent = "➕";
  $addButton.className = "add-button";

  if (child.id && child.title) {
    $span.textContent = child.title;
    $span.dataset.id = child.id;

    const $deleteButton = document.createElement("button");
    $deleteButton.textContent = "🗑";
    $deleteButton.className = "delete-button";
    $span.appendChild($deleteButton);
  } else {
    $addButton.classList.add("root");
    $addButton.textContent += " 문서 추가하기";
  }

  const $input = document.createElement("input");
  $input.type = "text";
  $input.placeholder = "문서 제목";
  $input.classList.add("document-title-input");
  $input.classList.add("hide");

  $span.appendChild($input);
  $span.appendChild($addButton);

  $container.appendChild($span);
}
