import { EMPTY_TITLE } from '../constants/messages.js';

export default function DocumentEditPage({
	$target,
	initialState,
	onPostChange,
}) {
	const $div = document.createElement('div');

	$div.setAttribute('class', 'edit_form');
	$target.appendChild($div);

	this.state = initialState;

	$div.innerHTML = `<input name='title'  style="margin-left: 84px" placeholder='${EMPTY_TITLE}'></input><div name="content" contentEditable="true" style="width:600px;height:400px; margin-left: 84px; border= 1px solid black; padding:8px; outline:none;"></div>`;

	const $input = document.querySelector(`input[name='title']`);
	const $divContent = document.querySelector(`div[name='content']`);

	this.setState = (nextState) => {
		if (!nextState) {
			$input.classList.add('initEditElement');
			$divContent.classList.add('initEditElement');
			return;
		}
		$input.classList.remove('initEditElement');
		$divContent.classList.remove('initEditElement');
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		const { id, title, content, documents, createdAt, updatedAt } =
			this.state;
		$input.value = title ? title : '';
		$divContent.innerHTML = content
			? JSON.parse(content)
					.map(({ tag, content }) => `<${tag}>${content}</${tag}>`)
					.join('')
			: '';
	};
	this.render();

	$input.addEventListener('input', (event) => {
		const { target } = event;
		const { textContent } = document.querySelector('div[name=content]');
		const { id } = this.state;

		onPostChange(id, {
			title: target.value.toString(),
			content: textContent.toString(),
		});
	});

	$divContent.addEventListener('input', (event) => {
		const { target } = event;
		const { value } = document.querySelector('input[name=title]');
		const { id } = this.state;

		const parser = new DOMParser();
		const htmlContent = target.innerHTML;
		const $contenteditableBody = parser.parseFromString(
			htmlContent,
			'text/html',
		);

		const $div = document.createElement('div');

		if (!$contenteditableBody.body.firstChild.tagName)
			$div.appendChild($contenteditableBody.body.firstChild);

		const contents = [$div, ...$contenteditableBody.body.children];

		const nextContent = contents.map((element) => {
			if (element.innerHTML.indexOf('# ') === 0) {
				const tag = 'H1';
				const content = element.innerHTML.substr(2);
				return { tag, content };
			} else if (element.innerHTML.indexOf('## ') === 0) {
				const tag = 'H2';
				const content = element.innerHTML.substr(3);
				return { tag, content };
			} else if (element.innerHTML.indexOf('### ') === 0) {
				const tag = 'H3';
				const content = element.innerHTML.substr(3);
				return { tag, content };
			} else {
				const tag = element.tagName;
				const content = element.innerHTML;
				return { tag, content };
			}
		});
		onPostChange(id, {
			title: value.toString(),
			content: JSON.stringify(nextContent),
		});
	});
}
