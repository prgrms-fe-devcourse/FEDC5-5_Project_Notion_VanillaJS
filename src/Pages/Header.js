export default function Header({ $target, initialState }) {
  const $div = document.createElement("div");
  $div.className = "headerUserName";
  $target.appendChild($div);

  this.state = initialState;

  this.setState = () => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $div.innerHTML = `
            <h2>${this.state.userName} 님의 Notion </h2>
        
        `;
  };
  this.render();
}
