import App from "./App.js";
import { CSS_SELECTOR } from "./components/cssSelector.js";
import { $ } from "./utils/dom.js";

const $app = $(`#${CSS_SELECTOR.ROOT}`);

try {
  new App({ $target: $app });
} catch (error) {
  console.error(error.message);
}
