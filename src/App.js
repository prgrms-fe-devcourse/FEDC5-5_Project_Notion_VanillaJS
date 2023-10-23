export default function App({ $target, initialState }) {
    // const $sideBar =
    const $page = document.createElement("div");
    $target.appendChild($page);
    console.log(initialState);

    this.state = initialState;

    this.render = () => {
        $page.innerHTML = `
        <ul>
            ${this.state.map((list) => `<li>${list.title}</li>`).join("")}
        </ul>
        `;
    };
    this.render();
}
