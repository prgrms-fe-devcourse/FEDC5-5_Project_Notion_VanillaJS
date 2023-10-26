export default function Editor({
  $target,
  initialState = { title: "", content: "" },
  onEditing,
}) {
  const $editor = document.createElement("div");
  this.state = initialState;

  $editor.innerHTML = `
    <input class="editor-input" type="text" name="title" placeholder="Untitled" style="width:600px">
    <div class="editor-content" name="content" contentEditable="true" placeholder="내용을 입력해주세요" style="width:600px;height:400px;border:none;padding:8px"></div>`;

  let isinitialize = false;

  $editor.style.width = "600px";
  $editor.style.height = "auto";
  $target.appendChild($editor);

  this.setState = (nextState) => {
    if (this.state.id !== nextState.id) {
      isinitialize = false;
    }

    this.state = nextState;

    if (!isinitialize) {
      // 렌더링이 계속 일어나지 않도록 flag 세움
      isinitialize = true;
      this.render();
    }
  };

  this.render = () => {
    const richContent = this.state.content
      ? this.state.content
          .split("\n")
          .map((line) => {
            if (line.indexOf("# ") === 0) {
              return `<h1>${line.substr(2)}</h1>`;
            } else if (line.indexOf("## ") === 0) {
              return `<h2>${line.substr(3)}</h2>`;
            }
            return `${line}<br>`;
          })
          .join("")
      : this.state.content;

    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").innerHTML = richContent;
  };

  this.render();

  // 제목 key up시 onEditing() 호출
  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value,
    };
    this.setState(nextState);

    onEditing(this.state);
  });

  // 글 내용 입력 시 onEditing() 호출
  $editor.querySelector("[name=content]").addEventListener("input", (e) => {
    const nextState = {
      ...this.state,
      content: e.target.innerText,
    };
    this.setState(nextState);
    onEditing(this.state);
  });
}
