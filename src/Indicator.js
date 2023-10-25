export default function Indicator({ targetEl, initialState }) {
  const indicatorEl = document.createElement("div");
  indicatorEl.classList.add("indicator");
  indicatorEl.classList.add("spinner-hidden");

  this.isInit = false;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.isInit) {
      indicatorEl.innerHTML = `<img class="spinner spinner-spin" src="/svg/loader.svg" />`;
      targetEl.appendChild(indicatorEl);
    }

    const spinnerEl = indicatorEl.querySelector(".spinner");

    if (spinnerEl) {
      spinnerEl.classList.toggle("spinner-hidden", this.state);
    }
  };
}
