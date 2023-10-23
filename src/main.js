import App from "./App.js";
import { getRootDocument } from "./api.js";

const $app = document.querySelector("#app");
// const initialState = await getRootDocument();

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

try {
    new App({ $target: $app, initialState });
} catch (error) {
    console.error(error);
}
