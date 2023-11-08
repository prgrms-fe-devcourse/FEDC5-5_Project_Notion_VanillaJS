const $ = document;
export default function TextAreaPage({ $target, initialState, onTextEditing, onTitleEditing }) {
  const $textArea = $.createElement("div");
  $textArea.className = "textArea";

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const $titleInputArea = $.createElement("input");
  $titleInputArea.className = "textArea-title";
  $titleInputArea.type = "text";
  $titleInputArea.name = "title";

  const $contentTextArea = $.createElement("textarea");
  $contentTextArea.className = "textArea-content";
  $contentTextArea.name = "content";

  $textArea.appendChild($titleInputArea);
  $textArea.appendChild($contentTextArea);

  $target.appendChild($textArea);

  this.render = () => {
    if (this.state.isLoading) {
      //대전제는 로딩
      $contentTextArea.value = "Content Loading...";
      $titleInputArea.value = "Title Loading...";
    } else {
      switch (this.state.pageType) {
        case "ROOT":
          $titleInputArea.value = this.state.title;
          $titleInputArea.readOnly = true;
          $contentTextArea.value = this.state.content;
          $contentTextArea.readOnly = true;
          break;
        case "NOT_ROOT":
          $titleInputArea.readOnly = false;
          $contentTextArea.readOnly = false;
          if (this.state.title) {
            $titleInputArea.value = this.state.title;
          } else {
            $titleInputArea.value = "";
            $titleInputArea.placeholder = "제목 없음";
          }
          if (this.state.content) {
            $contentTextArea.value = this.state.content;
          } else {
            $contentTextArea.value = "";
            $contentTextArea.placeholder = "빈 페이지입니다. 내용을 입력해주세요.";
          }
          break;
        default:
          break;
      }
    }
  };

  $titleInputArea.addEventListener("keyup", (e) => {
    if (this.state.pageType === "NOT_ROOT") {
      this.state.title = $titleInputArea.value;
      this.state.content = $contentTextArea.value;
      onTitleEditing(this.state.id, this.state.content, e.target, e.key);
    }
  });

  $contentTextArea.addEventListener("keyup", (e) => {
    if (this.state.pageType === "NOT_ROOT") {
      this.state.title = $titleInputArea.value;
      this.state.content = $contentTextArea.value;
      onTextEditing(this.state.id, this.state.title, e.target.value);
    }
  });
}
