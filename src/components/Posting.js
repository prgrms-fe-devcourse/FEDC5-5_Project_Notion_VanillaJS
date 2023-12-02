export default function Posting({ $target, initialState, onEditing }) {
  const $editor = document.createElement("section");
  $editor.className = "edit";
  $target.appendChild($editor);
  this.state = initialState;
  let isInit = true;

  this.setState = (nextState) => {
    if (this.state.id !== nextState.id)
      document.getElementsByTagName("input")[0].focus();
    this.state = nextState;
    $editor.querySelector("[name=content]").style.display =
      this.state.id === "new" ? "none" : "block"; // 새로운 포스팅을 적을 때 content부터 적어서 title이 빈값이 되는것 방지
    $editor.querySelector("[name=title]").value = this.state.title; //initialize 되고 난 후에 render시 값 업데이트가 안되기 때문에 넣은 코드
    $editor.querySelector("[name=content]").value = this.state.content;
    this.render();
  };

  this.render = () => {
    const { title, content } = this.state;
    if (isInit) {
      $editor.innerHTML = `<input name="title" value="${title}"/>
      <textarea name="content">${content}</textarea>`;
      isInit = false;
    }
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");
    if (this.state[name] === undefined) return;
    const nextState = {
      ...this.state,
      [name]: target.value,
    };
    this.setState(nextState);
    onEditing(this.state);
  });
}
