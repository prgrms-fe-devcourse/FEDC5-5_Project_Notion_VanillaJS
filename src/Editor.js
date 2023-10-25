export default function Editor({
    $target,
    initialState = { title: "", content: "" },
    onEditing,
}) {
    const $editor = document.createElement("div");
    $target.appendChild($editor);

    let isinitialize = false;

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        $editor.querySelector("[name=title]").value = this.state.title;
        $editor.querySelector("[name=content]").value = this.state.content;
    };

    this.render = () => {
        if (!isinitialize) {
            $editor.innerHTML = `
            <input type="text" name="title" style="width:600px;" value="${this.state.title}" placeholder="제목을 입력해주세요." />
            <textarea name="content" style="width:600px;height:400px;">${this.state.content}</textarea>
            `;
            isinitialize = true;
            console.log("editor initialize");
        }
    };
    this.render();

    $editor.addEventListener("keyup", (event) => {
        const { target } = event;

        const name = target.getAttribute("name");

        if (this.state[name] !== undefined) {
            const nextState = {
                ...this.state,
                [name]: target.value,
            };

            this.setState(nextState);
            onEditing(this.state);
        }
    });
}
