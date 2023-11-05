export default function HelpButton({ target, onClick }) {
  /* 버튼 박스 */
  const helpButtonElement = document.createElement("button");
  helpButtonElement.setAttribute("class", "app_helpButton");

  /* 버튼의 이름 설명 메세지 */
  const messageElement = document.createElement("div");
  messageElement.setAttribute("class", "app_helpButton_message");
  messageElement.textContent = "마크다운 사용법 🧐";
  helpButtonElement.appendChild(messageElement);

  /* 버튼 */
  const buttonImgElement = document.createElement("img");
  buttonImgElement.setAttribute("class", "app_helpButton_img");
  buttonImgElement.setAttribute("src", "/src/Img/Help_Icon.svg");
  helpButtonElement.appendChild(buttonImgElement);

  // 형제 노드라서 CSS 선택자가 안먹어요 🫠
  buttonImgElement.addEventListener("mouseover", () => {
    messageElement.style.bottom = "0rem";
    messageElement.style.right = "0rem";
  });
  buttonImgElement.addEventListener("mouseout", () => {
    messageElement.style.bottom = "-6rem";
    messageElement.style.right = "10rem";
  });

  target.appendChild(helpButtonElement);

  /* 버튼 클릭 이벤트 */
  buttonImgElement.addEventListener("click", () => {
    onClick();
  });

  /* 박스외의 click toggle off */
  window.addEventListener("click", (e) => {
    const cardElement = document.querySelector(".app_helpCard").classList;

    if (e.target !== buttonImgElement && cardElement.contains("cardToggled")) {
      onClick(this.state);
    }
  });
}
