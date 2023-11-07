import { createNewElement } from '../../../Util/Element.js';
import { convertToMarkup } from '../../../Util/Markup.js';
import { moveEndFocus } from '../../../Util/Focus.js';

// state = { title : "", content: "" }

export default class DocumentEditor {
    constructor({ $taregt, initalState, onEditing }) {
        this.$taregt = $taregt;
        this.state = initalState;
        this.onEditing = onEditing;

        this.init();
    }

    init() {
        this.$editor = createNewElement('section', [{ property: 'className', value: 'editor' }]);
        this.$title = createNewElement('input', [
            { property: 'type', value: 'text' },
            { property: 'name', value: 'title' },
            { property: 'className', value: 'editor__title' },
            { property: 'placeholder', value: '제목을 입력해주세요' },
        ]);
        this.$content = createNewElement('div', [
            { property: 'name', value: 'content' },
            { property: 'className', value: 'editor__content' },
            { property: 'contentEditable', value: true },
        ]);

        this.$editor.appendChild(this.$title);
        this.$editor.appendChild(this.$content);
        this.$taregt.appendChild(this.$editor);

        this.$editor.addEventListener('keyup', (e) => this.HandleOnKeyup(e));
        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        const { title, content } = this.state;
        // 현재 content 상태를 마크업으로 변경한다.
        const markupText = convertToMarkup(content);

        this.$title.value = title;
        this.$content.innerHTML = markupText ?? null;
    }

    // content 수정 이벤트 핸들러
    HandleOnKeyup(e) {
        const {
            target,
            isComposing,
            key,
            target: { value, innerHTML, name },
        } = e;

        // 방향키 입력 시 focus 이동 후 종료
        if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
            return;
        }

        if (name === 'title') {
            const nextState = { ...this.state, [name]: value };

            this.setState(nextState);
            this.onEditing(nextState, target);
        }

        if (name === 'content') {
            // 입력된 키가 엔터이고 2번 입력 방지
            if (key === 'Enter' && isComposing) {
                return;
            }
            // 엔터를 입력하면 이전 태그를 그대로 복사하는 문제 발생
            if (key === 'Enter' && !isComposing) {
                e.preventDefault(); // 줄 생성
                const nextState = { ...this.state, [name]: this.state[name] + '<div><br></div>' };

                this.setState(nextState);
                // DB에 수정된 데이터를 저장 후 sidebar의 제목도 리렌더링
                this.onEditing(nextState);
                return moveEndFocus(target);
            }

            // 한글을 입력하면 자모음 조합으로 2번 호출되어 딜레이를 준다.
            clearTimeout(this.inputTimeout); // 이전 setTimeout을 취소
            this.inputTimeout = setTimeout(() => {
                const nextState = { ...this.state, [name]: innerHTML };

                this.setState(nextState);
                // DB에 수정된 데이터를 저장 후 sidebar의 제목도 리렌더링
                this.onEditing(nextState);
                moveEndFocus(target);
            }, 400);
        }
    }
}
