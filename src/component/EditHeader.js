export default function EditHeader({ $target, initialState }) {
  /**
   * initialState => isLoading
   * isLoading
   */

  const $header = document.createElement("div");
  $header.classList = "editor-header";
  $target.appendChild($header);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.isLoading === true) {
      $header.innerHTML = `${this.state.selectedDocument.title} 저장중...`;
    } else {
      $header.innerHTML = `${this.state.selectedDocument.title}`;
    }
  };

  this.render();
}
