import "./onboarding.css";
import icon from "../../img/profile.png";

export default function OnBoarding({ $target }) {
  const $onBoarding = document.createElement("div");
  $onBoarding.className = "onboarding";
  $onBoarding.innerHTML = `
  <img src="${icon}"/>
<h1>Maru's Notion</h1>
<p>This is a Notion clone by Dayun.</p>
<p>Feel free to create documents! 📖</p>
`;

  /** onBoarding의 display 속성 변경 */
  this.display = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      $onBoarding.style.display = "block";
    } else {
      $onBoarding.style.display = "none";
    }
  };

  this.render = () => {
    $target.appendChild($onBoarding);
  };

  this.render();
}
