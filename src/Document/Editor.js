export default function Editor({ $page, initialState, onEdit }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
  };
  let isInit = false;

  this.render = () => {
    // console.log(this.state);
    // console.log(this.state.title);
    if (this.state.title !== null) {
      $page.innerHTML = `
        <input type="text" name="title" style="width:93%;  height:5%; margin:20px;" value=${this.state.title}>
        <textarea name="content" style="width:93%; height:80%; margin:20px;">${this.state.content}</textarea>
    `;
      isInit = true;
    }
  };

  $page.addEventListener("keyup", (e) => {
    const name = e.target.name;
    const nextState = {
      ...this.state,
      [name]: e.target.value,
    };
    this.setState(nextState);
    onEdit(nextState);
  });
}
