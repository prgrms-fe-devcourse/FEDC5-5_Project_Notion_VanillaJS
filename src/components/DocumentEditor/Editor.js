import checkNewComponent from "../../utils/checkNewComponent.js";

export default function Editor({
    $target,
    initialState = { title: "", content: "" },
    onEditing,
}) {
    const self = this;
    checkNewComponent(Editor, self);

    const $editor = document.createElement("div");
    $editor.id = "contentEditableItem";
    $target.appendChild($editor);

    $editor.innerHTML = `
    <input type="text" name="title" style="width:600px;border:1px solid black; padding: 8px;" placeholder="제목을 입력해주세요." />
    <div name="content" contentEditable="true" style="width:600px;height:400px; border:1px solid black; padding: 8px;"></div>
    `;

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;

        this.render();
    };

    this.render = () => {
        const richContent =
            this.state.content
                ?.split("<div>")
                .map((line) => {
                    line = line.replace("</div>", "");
                    if (line === "") return "";
                    if (line.indexOf("# ") === 0) {
                        line = `<h1>${line.substring(2)}</h1>`;
                    } else if (line.indexOf("## ") === 0) {
                        line = `<h2>${line.substring(3)}</h2>`;
                    } else if (line.indexOf("### ") === 0) {
                        return `<h3>${line.substring(4)}</h3>`;
                    } else if (line.indexOf("#### ") === 0) {
                        return `<h3>${line.substring(5)}</h3>`;
                    } else {
                        line = `<div>${line}</div>`;
                    }
                    return line;
                })
                .join("") || null;

        $editor.querySelector("[name=title]").value = this.state.title;
        $editor.querySelector("[name=content]").innerHTML = richContent;
    };
    this.render();

    $editor.querySelector("[name=title]").addEventListener("keyup", (event) => {
        const { target } = event;

        if (this.state.title !== undefined) {
            const nextState = {
                ...this.state,
                title: target.value,
            };
            this.setState(nextState);
            onEditing(this.state);
        }
    });

    let timer = null;
    $editor
        .querySelector("[name=content]")
        .addEventListener("input", (event) => {
            const { target } = event;

            const nextState = {
                ...this.state,
                content: target.innerHTML,
            };

            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                this.setState(nextState);
                onEditing(this.state);
            }, 2000);
        });
}
