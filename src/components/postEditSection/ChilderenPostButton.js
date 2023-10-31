import { routeTrigger } from "../../router/router.js"

export default function ChildrenPostButton({$target, title, id}) {
    const $button = document.createElement('button')
    $button.className = 'title'
    $target.appendChild($button)

    $button.textContent = title
    $button.addEventListener('click',()=>{
        routeTrigger(`/posts/${id}`)
    })
}
