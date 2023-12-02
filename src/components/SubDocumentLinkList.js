import { EMPTY_TITLE } from '../constants/messages.js';
import { SVG_DOCUMENT } from '../assets/svg.js';

export default function SubDocumentLinkList({
	$target,
	initialState = [],
	onSubDocumentLinkClick,
}) {
	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	const $ul = document.createElement('ul');

	$target.appendChild($ul);
	$ul.setAttribute('class', 'sub_document_ul');

	this.render = () => {
		const { documents } = this.state;
		if (documents) {
			$ul.innerHTML = documents
				.map(
					({ title, id }) =>
						`<li class='sub_document_link_container' data-id=${id}>${SVG_DOCUMENT}<span class="text">${
							title ? title : EMPTY_TITLE
						}<span></li>`,
				)
				.join('');
		} else {
			$ul.innerHTML = '';
		}
	};

	$ul.addEventListener('click', (event) => {
		const { target } = event;

		if (target.tagName !== 'SPAN') return;

		const { id } = target.closest('li').dataset;
		onSubDocumentLinkClick(id);
	});

	this.render();
}
