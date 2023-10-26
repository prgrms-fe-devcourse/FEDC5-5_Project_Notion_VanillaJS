export default function Editor({
    $target,
    initialState = { title: "", content: "" },
    onEditing,
}) {
    const $editor = document.createElement("div");
    $target.appendChild($editor);

    $editor.innerHTML = `
    <input type="text" name="title" style="width:600px;border:1px solid black; padding: 8px;" placeholder="제목을 입력해주세요." />
    <div name="content" contentEditable="true" style="width:600px;height:400px; border:1px solid black; padding: 8px;"></div>
    `;

    this.state = initialState;
    console.log(initialState);

    this.setState = (nextState) => {
        console.log(this.state);
        console.log(nextState);
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        // console.log(this.state.content.split("\n"));
        // if (this.state.content !== null) {
        //     console.log(this.state.content.split("\n"));
        //     console.log(this.state.content.split("<div>"));
        // }
        const richContent =
            this.state.content
                ?.split("<div>")
                .map((line) => {
                    console.log(line);
                    line = line.replace("</div>", "");
                    if (line === "") return "";
                    if (line.indexOf("# ") === 0) {
                        line = line.replace(
                            /[\#]{1}(.+)/g,
                            "<div><h1>$1</h1></div>"
                        );
                    } else if (line.indexOf("## ") === 0) {
                        line = line.replace(
                            /[\#]{2}(.+)/g,
                            "<div><h2>$1</h2></div>"
                        );
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
        console.log(richContent);

        $editor.querySelector("[name=title]").value = this.state.title;
        $editor.querySelector("[name=content]").innerHTML = richContent;
    };
    this.render();

    $editor.querySelector("[name=title]").addEventListener("keyup", (event) => {
        const { target } = event;
        console.log(target);
        console.log(target.value);

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
            console.log(target.innerHTML);
            console.log(target.innerText);

            const nextState = {
                ...this.state,
                content: target.innerHTML,
            };
            onEditing(nextState);

            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                this.setState(nextState);
            }, 2000);
        });
}
