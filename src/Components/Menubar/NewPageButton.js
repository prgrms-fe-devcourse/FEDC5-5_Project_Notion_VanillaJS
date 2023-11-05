export default function NewPageButton({ target, onEvent }) {
  const rootInsertButton = document.createElement("button");
  rootInsertButton.setAttribute("class", "menubar_rootInsertButton");

  const emojiTextElement = document.createElement("p");
  emojiTextElement.setAttribute("class", "menubar_rootInsertButton_buttonEmoji");
  emojiTextElement.textContent = "+";
  rootInsertButton.appendChild(emojiTextElement);

  const textElement = document.createElement("p");
  textElement.setAttribute("class", "menubar_rootInsertButton_buttonTitle");
  textElement.textContent = "New Page";
  rootInsertButton.appendChild(textElement);

  /* Insert 이벤트 */
  rootInsertButton.addEventListener("click", () => {
    onEvent({ id: null, insert: true });
  });

  target.appendChild(rootInsertButton);
}
