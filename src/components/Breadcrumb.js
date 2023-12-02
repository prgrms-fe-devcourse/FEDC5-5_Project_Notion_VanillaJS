import { EMPTY_TITLE } from '../constants/messages.js';

export default function Breadcrumb({
	$target,
	initialState,
	onBreadcrumbItemClick,
}) {
	const $p = document.createElement('p');

	$p.setAttribute('class', 'breadcrumb header');
	$target.appendChild($p);

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		$p.innerHTML = this.state.length
			? `${this.state
					.map(({ id, title }) => {
						return title
							? `<span data-id="${id}" class="breadcrumb_text">${title}</span>`
							: `<span data-id="${id}" class="breadcrumb_text">${EMPTY_TITLE}</span>`;
					})
					.join('<span class="breadcrumb_text_separator">/</span>')}`
			: '';
	};
	this.render();

	$p.addEventListener('click', (event) => {
		const { target } = event;
		if (target.tagName !== 'SPAN') return;
		const { id } = target.dataset;
		if (!id) return;
		onBreadcrumbItemClick(id);
	});
}
