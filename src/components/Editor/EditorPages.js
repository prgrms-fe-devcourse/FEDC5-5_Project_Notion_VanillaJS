import { setItem, getItem, removeItem } from '../../../utils/storage.js'

export default function EditorPages({$target, initialState, onEditing}) {
    const $editor = document.createElement('div');
    const $preview = document.createElement('div');
    $editor.classList.add('editor');
    $target.classList.add('show');
    
    $target.appendChild($editor);
    $target.appendChild($preview);
    

    let isInitialize = false;
    this.state = initialState;

    this.setState = newState => {
        this.state = newState;
        const title = $editor.querySelector('[name="title"]');
        title.value = this.state?.title;

        const content = $editor.querySelector('[name="content"]');
        const contentValue = this.richContent(this.state?.content);
        content.innerHTML = contentValue ? contentValue : '';

        this.render();
    }
    

    this.richContent = (content) => {
        if(!content) return null;

        const result = content.split('<div>').map(text => {
            const setText = text.replace('</div>', '');

            const bStart = setText.indexOf('&lt;b&gt;');
            const bEnd = setText.indexOf('&lt;/b&gt;');

            const strongStart = setText.indexOf('&lt;strong&gt;');
            const strongEnd = setText.indexOf('&lt;/strong&gt;');

            if(setText.indexOf('# ') === 0) {
                return `<h1>${setText.slice(2)}</h1>`;
            } else if(setText.indexOf('## ') === 0) {
                return `<h2>${setText.slice(3)}</h2>`;
            } else if(setText.indexOf('### ') === 0) {
                return `<h3>${setText.slice(4)}</h3>`;
            } else if(setText.indexOf('#### ') === 0) {
                return `<h4>${setText.slice(5)}</h4>`;
            } else if(bStart === 0 && bStart < bEnd) {
                const b = setText.slice(9).slice(0, -10)
                return `<b>${b}</b>`;
            } else if(strongStart === 0 && strongStart < strongEnd) {
                const strong = setText.slice(14).slice(0, -15);
                return `<strong>${strong}</strong>`;
            } else if(setText.length > 0){
                return `<div>${setText}</div>`;
            }
        }).join('');
        return result
    }

    this.render = () => {
        $target.classList.add('show');
        if(!isInitialize) {
            $editor.innerHTML = `
                <input type="text" name="title" value="${this.state.title}" placeholder="제목을 입력해주세요." />
                <div class="content" name="content" contenteditable="true" placeholder="내용을 입력해주세요."></div>
            `;
            isInitialize = true;
        }
    }

    this.render()

    $editor.querySelector('[name=title]').addEventListener('keyup', (e) => {
        const { value } = e.target;
        const newState = {
            ...this.state,
            title: value
        }

        this.setState(newState);
        onEditing(this.state);
    })

    $editor.querySelector('[name=content]').addEventListener('input', (e) => {
        const newState = {
            ...this.state,
            content: e.target.innerHTML,
        }
        setItem('save', newState);
    })

    window.addEventListener('load', (e) => {
        const newState = getItem('save');
        if(newState) {
            this.setState(newState);
            onEditing(this.state);
            removeItem('save');
        }
    })

    $editor.querySelector('[name=content]').addEventListener('blur', (e) => {
        const newState = getItem('save');
        if(newState) {
            this.setState(newState);
            onEditing(this.state);
        }
    })
}