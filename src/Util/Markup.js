export const convertToMarkup = (text) => {
    if (!text) {
        return;
    }

    return text
        .split('</div>')
        .map((line) => {
            line = line.replace('<div>', '');

            line = line
                .replace(/__((?:\S.*?\S)|\S)__/g, '<strong>$1</strong>') // __굵게__
                .replace(/\*\*((?:\S.*?\S)|\S)\*\*/g, '<strong>$1</strong>') // **굵게**
                .replace(/_((?:\S.*?\S)|\S)_/g, '<em>$1</em>') // _기울게_
                .replace(/\*((?:\S.*?\S)|\S)\*/g, '<em>$1</em>') // *기울게*
                .replace(/~~((?:\S.*?\S)|\S)~~/g, '<s>$1</s>') // ~~취소선~~
                .replace(/^# (.*?)$/, '<h1>$1</h1>') // h1 부터
                .replace(/^## (.*?)$/, '<h2>$1</h2>')
                .replace(/^### (.*?)$/, '<h3>$1</h3>')
                .replace(/^#### (.*?)$/, '<h4>$1</h4>')
                .replace(/^##### (.*?)$/, '<h5>$1</h5>')
                .replace(/^###### (.*?)$/, '<h6>$1</h6>'); // h6 까지

            // 아무것도 없다면 div를 감싸주지 않고 종료
            if (!line) {
                return;
            }

            // 다시 div 태그로 감싸준다.
            return '<div>' + line + '</div>';
        })
        .join('');
};
