export default function Indicator({ targetEl, initialState }) {
  const indicatorEl = document.createElement("div");

  this.isInit = false;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.isInit) {
      indicatorEl.classList.add("indicator");
      indicatorEl.classList.add("spinner-hidden");

      targetEl.appendChild(indicatorEl);
      
      indicatorEl.innerHTML = `
        <img class="icon spinner spinner-spin" src="/svg/loader.svg" alt="spinner image" />
      `;
    }

    const spinnerEl = indicatorEl.querySelector(".spinner");

    if (spinnerEl) {
      spinnerEl.classList.toggle("spinner-hidden", this.state);
    }
  };
}
