export default function Editor({ $target, initialState, onEditing }) {

    const $editor = document.createElement('div')
    $editor.className = 'editor'
    $editor.innerHTML = `
        <input type="text" class="editor-title" name="title" />
        <div name="content" class="editor-content" contentEditable="true" ></div>
        `

    $target.appendChild($editor)

    const $title = $editor.querySelector('[name=title]')
    const $content = $editor.querySelector('[name=content]')

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.renderRichContent = (content) => {      
        if(content == null) {
            return ''
        }
        const richContent = content == null ? '' : content
            .split('<div>')
            .map(line => {
                line = line.replace('</div>','')
                if(line === '') return ''
                if(line.indexOf('# ') === 0) {
                    return `<h1>${line.substring(2)}</h1>`
                }
                else if(line.indexOf('## ') === 0) {
                    return `<h2>${line.substring(3)}</h2>`
                }
                else if(line.indexOf('### ') === 0) {
                    return `<h3>${line.substring(4)}</h3>`
                }
                else if(line.indexOf('#### ') === 0) {
                    return `<h4>${line.substring(5)}</h4>`
                }
                return `<div>${line}</div>`
            }).join('')
        return richContent
    }   

    this.render = () => {
        $title.value = this.state.title
        $title.setAttribute('placeholder', this.state.title === '' ? '제목 없음' : '')
        $content.innerHTML = this.renderRichContent(this.state.content) || '' //richContent
    } 

    this.render()

    $title.addEventListener('keyup', e=> {
        const nextState = {
            ...this.state,
            title: e.target.value
        }
        
        this.setState(nextState)
        onEditing(this.state)
    })

    //한글 입력시 맨 앞줄에서 제자리를 멤도는 케이스 방지
    let isComposition = false;

    $content.addEventListener('compositionstart', () => {
        isComposition = true;
    });

    $content.addEventListener('compositionend', () => {
        isComposition = false;
    });

    $content.addEventListener('input', e=> {    
        if (isComposition) {
            return;
        }
        
        
        const nextState = {
            ...this.state,
            content: e.target.innerHTML
        }

        this.setState(nextState)
        onEditing(this.state)

        handleCursor(e.target);
    })

    const handleCursor = (element) => {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(element)
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
    }
}