export default function Editor({
    $target,
    initialState = {
        title: '',
        content: ''
    },
    onEdit
}) {
    this.state = initialState
    const $editor = document.createElement('div')
    $editor.className = 'editPage_editor'
    $target.appendChild($editor)

    let isinitialize = true

    this.setState = (nextState) => {
        this.state = nextState
        $editor.querySelector('[name=title]').value = this.state.title
        $editor.querySelector('[name=content]').value = this.state.content
        
        this.render()
    }

    this.render = () => {
        if (isinitialize) {
            $editor.innerHTML = `
            <input type = "text" class="title" name = "title" style = "width: 600px;" placeholder="제목 없음" value = "${this.state.title}"/>
            <textarea name = "content" class="content" style = "width: 600px; height: 400px"placeholder="내용을 입력하세요.">${this.state.content}</textarea>
        `
            isinitialize = false
        }
       
        

    }
    this.render()


    $editor.addEventListener('keyup', e => {
        const {
            target
        } = e
        const name = target.getAttribute('name')
        if (this.state[name] !== undefined) {
            const nextState = {
                ...this.state,
                [name]: target.value
            }
            this.setState(nextState)
            onEdit(this.state)
        }
    })
}
