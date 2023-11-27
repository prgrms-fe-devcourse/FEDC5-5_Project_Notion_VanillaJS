import App from "./app.js"
const $app = document.querySelector('#app')
const $target = document.createElement('div')
$app.appendChild($target)
new App({
    $target
})
