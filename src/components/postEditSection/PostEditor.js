export default function PostEditor({$target, initialState, onEdit}) {

    const $editor = document.createElement('div')
    $editor.className = 'editor'
    $target.appendChild($editor)

    this.state = initialState

    this.setState = (newState) => {
        this.state = newState

        this.render()
    }

    this.render = () => {
        const {title, content} = this.state

        $editor.innerHTML = `
            <input name="title" class="title" placeholder="Untitled" value="${title}"></input>
            <textarea name="content" class="content" placeholder="내용을 입력하세요">${content ?? ''}</textarea>
        `
    }

    this.render()

    $editor.addEventListener('input', () => {
        const $input = $editor.querySelector('[name="title"]')
        const $content = $editor.querySelector('[name="content"]')

        onEdit({
            title: $input.value,
            content: $content.value
        })
    })
}