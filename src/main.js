import App from './App.js'

const $app = document.querySelector('.app')

try {
    new App({ $target: $app })
} catch(e) {
    console.log(e.message)
}