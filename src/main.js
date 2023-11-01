import App from './components/App.js';

const $target = document.querySelector('#app');
const initialState = {
  documents: [],
  editingDocument: null,
};

new App({ $target, initialState });
