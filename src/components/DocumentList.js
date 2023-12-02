import { EMPTY_TITLE } from '../constants/messages.js';
import { getItem, setItem } from '../storage.js';
import { SVG_ARROW_DOWN, SVG_PLUS, SVG_DELETE } from '../assets/svg.js';
export default function DocumentList({
	$target,
	initialState,
	onTitleClick,
	onCreatePage,
	onDeletePage,
}) {
	const $div = document.createElement('div');
	const $divListContainer = document.createElement('div');

	$div.setAttribute('class', 'list_container');
	$divListContainer.setAttribute('class', 'li_container');
	$div.appendChild($divListContainer);
	$target.appendChild($div);

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.stateRecursion = (documentsArray, $parentElement, index) => {
		const $ul = document.createElement('ul');
		documentsArray.sort((a, b) => {
			a.createdAt - b.createdAt;
		});

		documentsArray.forEach(({ id, title, documents }) => {
			const $li = document.createElement('li');

			$li.setAttribute('data-id', id);
			$li.innerHTML = `<div class='tab_container'><button name='arrow'>${SVG_ARROW_DOWN}</button>
				<span class='text title_text'>${
					title ? title : EMPTY_TITLE
				}</span><button name='delete' class='hover_button'>${SVG_DELETE}</button><button name='add' class='hover_button'>${SVG_PLUS}</button></div>
			`;

			if (documents.length) {
				this.stateRecursion(documents, $li, index + 1);
			} else {
				$li.innerHTML += `<ul><li><span class="text not_exist">하위 페이지 없음</span></li></ul>`;
			}
			$ul.appendChild($li);
		});
		$parentElement.appendChild($ul);
	};

	this.toggleHidden = () => {
		const keys = getItem('KNotionProject', []);

		keys.forEach((key) => {
			const $li = document.querySelector(`[data-id='${key}']`);
			if (!$li) {
				const filteredKeys = keys.filter(
					(keyElement) => key !== keyElement,
				);
				setItem('KNotionProject', JSON.stringify(filteredKeys));
				return;
			}
			const $ul = $li.querySelector('ul');
			$ul.classList.add('hidden');
			const $svg = $li.querySelector('[name=toggle]');
			$svg.classList.add('rotate');
		});
	};

	this.render = () => {
		$divListContainer.innerHTML = '';
		const $fragment = document.createDocumentFragment();

		this.stateRecursion(this.state, $fragment, 0);
		$divListContainer.appendChild($fragment);
		this.toggleHidden();
	};
	this.render();

	$divListContainer.addEventListener('click', (event) => {
		const { target } = event;

		if (target.tagName === 'SPAN') {
			const { id } = target.closest('li').dataset;
			if (id === undefined) return;
			onTitleClick(id.toString());
			return;
		}

		const $button = target.closest('button');
		if ($button === null) return;
		if ($button.tagName !== 'BUTTON') return;

		if ($button.name === 'arrow') {
			const $li = $button.closest('li');
			const $ul = $li.querySelector('ul');
			const { id } = $li.dataset;

			const $svg = $li.querySelector('[name=toggle]');

			$ul.classList.toggle('hidden');
			if ($ul.classList.contains('hidden')) {
				$svg.classList.remove('rotate');
			} else {
				$svg.classList.add('rotate');
			}

			const toggled = getItem('KNotionProject', []);

			if ($ul.classList.contains('hidden')) {
				const newToggled = [...toggled, id];
				setItem('KNotionProject', JSON.stringify(newToggled));
				const $svg = $li.querySelector('[name=toggle]');
				$svg.classList.add('rotate');
			} else {
				const newToggled = toggled.filter((item) => item !== id);
				setItem('KNotionProject', JSON.stringify(newToggled));
				const $svg = $li.querySelector('[name=toggle]');
				$svg.classList.remove('rotate');
			}
			return;
		}

		if ($button.name === 'add') {
			const { id } = target.closest('li').dataset;
			onCreatePage(JSON.parse(id));
			return;
		}

		if ($button.name === 'delete') {
			const $li = $button.closest('li');
			const { id } = $li.dataset;
			onDeletePage(JSON.parse(id), $li);
			return;
		}
	});
}
