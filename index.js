import App from './src/App.js';
import { DOCUMENTS } from './src/constants/index.js';

const $target = document.querySelector('.app');

const initialState = [];

const app = new App({ $target, initialState });
app.fetch({ url: DOCUMENTS, callback: app.setState });
