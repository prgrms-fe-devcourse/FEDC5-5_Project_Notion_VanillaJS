export default function Loading({ $container }) {
  const $loading = document.createElement("div");
  $loading.id = "loading";
  $loading.className = "loading";
  $container.appendChild($loading);

  this.state = { isLoading: false };

  this.setState = (nextState) => {
    this.state = nextState;

    if (this.state.isLoading) {
      $loading.classList.add("show");
      $loading.innerHTML = `<div class="loading-message">로딩 중 입니다...</div>`;
    } else {
      $loading.classList.remove("show");
      $loading.innerHTML = "";
    }
  };
}
