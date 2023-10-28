export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $target.appendChild($editor);

  $editor.innerHTML = `
  <input type="text" name="title" style="width: 600px;"/>
  <textarea name="content" style="width: 600px; height: 400px;"></textarea>
`;

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $editor.innerHTML;

    $editor.querySelector("[name=title]").value = this.state.title || "";
    $editor.querySelector("[name=content]").value = this.state.content || "";
  };

  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value,
    };

    this.setState(nextState);
    onEditing(this.state);
  });

  $editor.querySelector("[name=content]").addEventListener("keyup", (e) => {
    const nextState = {
      ...this.state,
      content: e.target.value,
    };

    this.setState(nextState);
    onEditing(this.state);
  });
}

// contentEditable 적용 중인 코드

// export default function Editor({ $target, initialState, onEditing }) {
//   const $editor = document.createElement("div");
//   $target.appendChild($editor);

//   $editor.innerHTML = `
//   <div class="editor_header" name="title" contentEditable='true'></div>
//   <div class="editor_content" name="content" contentEditable='true'></div>
// `;

//   this.state = initialState;
//   this.setState = (nextState) => {
//     this.state = nextState;
//     this.render();
//   };

//   this.render = () => {
//     if (this.state.content) {
//       const richContentNotion = this.state.content
//         .split("\n")
//         .map((line) => {
//           if (line.indexOf("# ") === 0) {
//             return `<h1>${line.substr(2)}</h1>`;
//           } else if (line.indexOf("## ") === 0) {
//             return `<h2>${line.substr(3)}</h2>`;
//           } else if (line.indexOf("### ") === 0) {
//             return `<h3>${line.substr(4)}</h3>`;
//           }
//           return line;
//         })
//         .join("<br>");

//       $editor.querySelector("[name=content]").innerHTML =
//         richContentNotion || "";
//     }

//     $editor.querySelector("[name=title]").innerHTML = this.state.title || "";
//   };

//   $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
//     const nextState = {
//       ...this.state,
//       title: e.target.innerHTML,
//     };

//     this.setState(nextState);
//     onEditing(this.state);
//   });

//   $editor.querySelector("[name=content]").addEventListener("keyup", (e) => {
//     const nextState = {
//       ...this.state,
//       content: e.target.innerHTML,
//     };

//     this.setState(nextState);
//     onEditing(this.state);
//   });
// }
