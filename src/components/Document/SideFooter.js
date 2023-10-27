export default function SideFooter({ $target }) {
    const $footer = document.createElement('footer');
    
    $target.appendChild($footer);

    this.render = () => {
        $footer.innerHTML = `
            <a class="velog" href="https://velog.io/@rekoding" target="_blank">블로그 바로가기</a>
            <a class="github" href="https://github.com/SeungHyune" target="_blank">Github 바로가기</a>
        `
    }

    this.render();
}