export default function Modal({ $container }) {
  const $modal = document.createElement("div");
  $modal.id = "modal-container";
  $modal.className = "modal-container";
  $container.appendChild($modal);

  this.state = { isShow: false, message: "", className: "" };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $newModal = document.createElement("div");
    $newModal.id = "modal";
    $newModal.className = "modal";
    $newModal.textContent = this.state.message;
    $modal.appendChild($newModal);

    if (this.state.isShow) {
      $modal.classList.add("show");
      setTimeout(() => {
        $newModal.classList.add("show");
        $newModal.classList.add(this.state.className);
      }, 100);

      setTimeout(() => {
        $newModal.classList.remove("show");
        setTimeout(() => {
          $modal.classList.remove("show");
          $modal.removeChild($newModal);
        }, 1000);
      }, 3000);
    }
  };
}
