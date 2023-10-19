export default function Header({ $target, text }) {
  const $h1 = document.createElement("h1");
  $h1.id = "header";

  $target.appendChild($h1);

  this.render = () => {
    $h1.innerHTML = `
      🐱${text}🐱
    `;
  };

  this.render();
}
