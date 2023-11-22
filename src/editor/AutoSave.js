export default function AutoSave({ $target, initialState }) {
  const $autoSave = document.createElement("div");
  $target.appendChild($autoSave);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $autoSave.innerHTML = `
        ${
          this.state === false
            ? ""
            : `<span class='autoSave'>자동 저장 되었습니다</span>`
        }
    `;

    setTimeout(() => {
      this.setState(false);
    }, 4000);
  };

  this.render();
}
