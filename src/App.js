import SideBar from "./SideBar.js";

export default function App({ $target }) {
    const initialState = [
        {
            id: 1, // Document id
            title: "노션을 만들자", // Document title
            documents: [
                {
                    id: 2,
                    title: "블라블라",
                    documents: [
                        {
                            id: 3,
                            title: "함냐함냐",
                            documents: [],
                        },
                    ],
                },
            ],
        },
        {
            id: 4,
            title: "hello!",
            documents: [],
        },
    ];
    console.log(initialState);

    this.state = initialState;
    const sideBar = new SideBar({ $target, initialState });

    this.render = () => {};
    this.render();
}
