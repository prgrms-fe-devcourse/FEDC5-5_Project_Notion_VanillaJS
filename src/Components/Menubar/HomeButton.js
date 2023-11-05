import { makeRouterEvent } from "../../Router/Router.js";

export default function HomeButton({ target }) {
  const homeButtonElement = document.createElement("button");
  homeButtonElement.setAttribute("class", "menubar_homeButton");

  const imgElement = document.createElement("img");
  imgElement.setAttribute("class", "menubar_homeButton_img");
  imgElement.setAttribute("alt", "HomeButtonImage");
  imgElement.setAttribute("src", "/src/Img/Home_Icon.svg");
  homeButtonElement.appendChild(imgElement);

  const textElement = document.createElement("p");
  textElement.setAttribute("class", "menubar_homeButton_text");
  textElement.textContent = "홈 이동 ";
  homeButtonElement.appendChild(textElement);

  /* Index Page 이동 */
  homeButtonElement.addEventListener("click", () => {
    makeRouterEvent({ url: "/", event: "push" });
  });

  target.appendChild(homeButtonElement);
}
