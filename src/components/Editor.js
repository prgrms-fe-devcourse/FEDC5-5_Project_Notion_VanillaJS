import { updateDocument } from "../services/apiManager/index.js";
import { createCommonElement } from "../services/createCommonElement.js";
import requireNew from "../services/requireNew.js";

export function Editor({ $target, initialContent, changeTitle }) {
    requireNew(new.target);

    const $title = createCommonElement("input", {
        class: "editor-title",
        placeholder: "제목 입력",
    });

    const $content = createCommonElement("textarea", {
        class: "editor-content",
        autofocus: true,
    });

    const $editor = createCommonElement(
        "div",
        { class: "editor" },
        $title,
        $content
    );

    this.state = initialContent;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.appendEditor = () => {
        $target.appendChild($editor);
    };

    this.removeEditor = () => {
        $editor.remove();
    };

    let timeoutId;

    $editor.addEventListener("keyup", (e) => {
        const nextState = { ...this.state };
        if (e.target.classList.contains("editor-title")) {
            this.setState({ ...nextState, title: e.target.value });
            changeTitle(history.state.documentId, e.target.value);
        } else if (e.target.classList.contains("editor-content")) {
            this.setState({ ...nextState, content: e.target.value });
        }

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            updateDocument(history.state.documentId, this.state);
            console.log("render");
        }, 2000);
    });

    this.render = () => {
        $title.value = this.state.title;
        $content.value = this.state.content;
    };
}
