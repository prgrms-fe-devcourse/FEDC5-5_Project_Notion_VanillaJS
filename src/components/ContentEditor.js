export default function ContentEditor({ $target, initialState, onEditing }) {
  const $contentContainer = document.createElement("div");
  $contentContainer.className = "text-container";

  $contentContainer.innerHTML = `
    <div class="input-content" contenteditable="true"></div>
  `;

  const renderMarkdown = (text) => {
    if (!text) return text;
    const richContent = text
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
      .replace(/^##### (.+)$/gm, "<h5>$1</h5>")
      .replace(/\n/g, "<br>");

    console.log("richContent", richContent);

    return richContent;
  };

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $contentContainer.querySelector(".input-content").innerHTML =
      renderMarkdown(this.state);
  };

  this.render = () => {
    $target.appendChild($contentContainer);
  };

  this.render();

  const focusToEnd = (element) => {
    if (element.innerText.length === 0) {
      // console.log("element.innerText", element.innerText);
      element.focus();
      return;
    }

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  // $contentContainer.querySelector(".input-content").addEventListener("click", (e) => {
  //   e.target.innerHTML = this.state.content;
  // });

  // 편집기 내용 입력
  $contentContainer
    .querySelector(".input-content")
    .addEventListener("input", (e) => {
      // console.log("before: e.target.innerHTML", e.target.innerHTML);
      // const $inputContent = $contentContainer.querySelector(".input-content");

      // $inputContent.value = e.target.innerText;
      // console.log("$inputContent.value", $inputContent.value);

      // e.target.innerHTML = $inputContent.value;
      // console.log("after: e.target.innerHTML", e.target.innerHTML);

      focusToEnd(e.target);

      // // console.log(e.target.innerText.split("\n"));
      // // console.log(
      // //   'e.target.innerText.indexOf("\n")',
      // //   e.target.innerText.indexOf("\n")
      // // );
      // const richContent = e.target.innerHTML
      //   // .replace("<div>", "\n") // <div> 태그가 두 번째 줄부터 생성됨.
      //   // .replace(/<div><br><\/div>/g, "<br>\n")
      //   .replace(/<div>/g, "")
      //   .replace(/<\/div>/g, "")
      //   // .replace(/<\/div><div><br>/g, "<br>")
      //   // .replace(/<\/div><div>/g, "\n")
      //   // .replace(/<\/div>/g, "")
      //   .split("<br>")
      //   .map((line) => {
      //     console.log("line", line);
      //     if (line.length === 0) return;
      //     if (line.startsWith("<br>")) {
      //       return line;
      //     }
      //     if (line.startsWith("# ")) {
      //       return `<h1>${line.substring(2)}</h1>`;
      //     }
      //     if (line.startsWith("## ")) {
      //       return `<h2>${line.substring(3)}</h2>`;
      //     }
      //     if (line.startsWith("### ")) {
      //       return `<h3>${line.substring(4)}</h3>`;
      //     }
      //     if (line.startsWith("#### ")) {
      //       return `<h4>${line.substring(5)}</h4>`;
      //     }
      //     if (line.startsWith("##### ")) {
      //       return `<h5>${line.substring(6)}</h5>`;
      //     }
      //     return `${line}`;
      //   })
      //   .join("<br>");

      // console.log("richContent", richContent);
      // onEditing({
      //   ...this.state,
      //   content: `${richContent}`,
      // });

      onEditing({
        ...this.state,
        content: e.target.innerText,
      });
    });
}
