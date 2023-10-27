export default function Editor({ $target, initialState = { title: '', content: '' }, onEdit }) {
  const $editor = document.createElement("div");
  $target.appendChild($editor);
  $editor.className = 'editor';

  let initialize = false;
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
    this.render();
  };

  this.render = () => {
    if (!initialize) {
      $editor.innerHTML = `
        <input style="margin-left: 200px; width: 600px; height: 30px; "type="text" name="title" placeholder="제목을 입력해주세요." value=${this.state.title}></input>
        <textarea style="display: flex; margin-left: 200px; width: 600px; height: 600px;" name="content" placeholder="내용을 입력하세요.">${this.state.content}</textarea>
        `;
      initialize = true;
    }
  };
  this.render();

  $editor.addEventListener("keyup", (e) => {
    const {target} = e;
    const name = target.getAttribute("name");
    if (this.state[name] !== undefined) {
        const nextState = {...this.state, [name]: target.value};
        this.setState(nextState);
        onEdit(nextState)
    }
    
  });
}
