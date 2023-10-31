import App from "./App.js"

const $app = document.querySelector('.app')

const initialState = {
    postList: [],
    selectedPost: {}
}

new App({
    $target: $app,
    initialState
})