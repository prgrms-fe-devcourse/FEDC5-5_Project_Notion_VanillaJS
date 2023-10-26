export default function ListHeader({ $target, initialState }) {
  /**
   * state : {isLoading}
   */
  this.state = initialState;
  const $header = document.createElement("h1");

  $target.appendChild($header);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state) {
      $header.innerText = "Loading중...";
    } else {
      $header.innerText = "호민의 Notion";
    }
  };

  this.render();
}
