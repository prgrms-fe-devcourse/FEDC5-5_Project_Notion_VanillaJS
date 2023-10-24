import App from "./App.js";
import { getRootDocument } from "./api.js";

const $app = document.querySelector("#app");
// const initialState = await getRootDocument();

try {
    new App({ $target: $app });
} catch (error) {
    console.error(error);
}
