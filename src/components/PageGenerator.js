import { SVG_CIRCLE_ADD } from '../assets/svg.js';

export default function PageGenerator({ $target, initialState, onCreatePage }) {
	const $div = document.createElement('div');
	$div.setAttribute('class', 'create_page_container');
	$div.innerHTML = `<button name='circle_add' class='circle_add'>${SVG_CIRCLE_ADD}</button><span class="create_page text" >새 페이지</span>`;

	$target.appendChild($div);
	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
	};

	$div.addEventListener('click', (event) => {
		const { target } = event;
		if (target.tagName !== 'SPAN') return;
		onCreatePage();
	});
}
