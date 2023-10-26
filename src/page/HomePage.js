export default function HomePage({ $target }) {
  const $home = document.createElement("div");
  const $span = document.createElement("div");
  $span.innerHTML = `Hober's Notion`;

  $home.classList = "home-page";

  const $image = document.createElement("img");
  $image.src = "../img/notion.PNG";
  $home.appendChild($span);
  $span.appendChild($image);

  this.render = () => {
    $target.appendChild($home);
  };
}
