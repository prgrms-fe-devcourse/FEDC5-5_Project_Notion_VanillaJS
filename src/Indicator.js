import { AsyncRequestEvent } from "./api.js";

export default function Indicator({ targetEl, initialState }) {
  const indicatorEl = document.createElement("div");

  this.isInit = false;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.init = () => {
    indicatorEl.className = "indicator indicator-hidden";

    targetEl.appendChild(indicatorEl);
    AsyncRequestEvent.init((status) => this.setState(status));

    indicatorEl.innerHTML = `
      <img class="icon spinner spinner-spin" src="/svg/loader.svg" alt="spinner image" />
    `;
  };

  this.render = () => {
    if (!this.isInit) {
      this.init();
      this.isInit = true;
    }

    indicatorEl.classList.toggle("indicator-hidden", !this.state);
  };
}
