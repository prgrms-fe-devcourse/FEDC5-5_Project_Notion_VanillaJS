export default function Editor({ $page, initialState, onEdit }) {
  this.state = initialState;

  const handleKeyUp = (e) => {
    const name = e.target.name;
    const nextState = {
      ...this.state,
      [name]: e.target.value,
    };
    if (name === "title" && e.target.value === "") {
      nextState.title = "제목없음";
    }
    console.log(nextState);
    this.setState(nextState);
    onEdit(nextState);
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };
  let isInit = false;

  this.render = () => {
    if (this.state.title === "제목없음") {
      $page.innerHTML = `
        <input type="text" name="title" style="width:93%; height:5%; margin:20px;" placeholder="제목을 입력하세요"> <!-- Use placeholder attribute -->
        <textarea name="content" style="width:93%; height:80%; margin:20px;">${this.state.content}</textarea>
      `;
    } else {
      $page.innerHTML = `
        <input type="text" name="title" style="width:93%; height:5%; margin:20px;" value="${this.state.title}">
        <textarea name="content" style="width:93%; height:80%; margin:20px;">${this.state.content}</textarea>
      `;
    }
    isInit = true;
  };

  $page.addEventListener("keyup", (e) => handleKeyUp(e));
}
