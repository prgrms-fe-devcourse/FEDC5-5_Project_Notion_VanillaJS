import { createElementWithClass } from '@util/dom';
import parsedTagType from '@util/tag';
import { CHARACTER, TEXT } from '@util/constant';
import './style.scss';

export default function ContentBlock({ $target, initialState }) {
	const $content = createElementWithClass(initialState.tagName ?? 'div', 'content-block');
	$content.setAttribute('contenteditable', true);
	$content.setAttribute('placeholder', TEXT.placeholder);
	$target.appendChild($content);
	this.getElement = () => $content;

	this.state = {
		isEmpty: false,
		...initialState,
	};
	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		$content.innerHTML = `${this.state.innerText}`;

		$content.addEventListener('keyup', (e) => {
			this.handleKeyUpContentBlock(e);
		});
	};

	this.handleKeyUpContentBlock = (e) => {
		if ($content.innerHTML.length === 1) {
			this.state.isEmpty = false;
			return;
		}
		if (this.state.isEmpty && CHARACTER.delete === e.code) {
			$content.previousSibling?.focus();
			$target.removeChild($content);
			return;
		}
		if ($content.innerHTML.length === 0) {
			this.state.isEmpty = true;
			return;
		}

		if (CHARACTER.enter === e.code) {
			const text = e.target.innerHTML;
			const [previousText, nextText] = text.split('<div>');
			e.target.innerHTML = previousText;
			const init = {
				tagName: 'div',
				innerText: nextText?.slice(0, -6),
			};
			const $newElement = new ContentBlock({ $target, initialState: init });
			$target.insertBefore($newElement.getElement(), $content.nextSibling);
			$content.nextSibling?.focus();
			return;
		}

		if (CHARACTER.change === e.code) {
			const tag = $content.innerHTML.split(' ')[0];
			const isParsedTag = tag in parsedTagType;
			const init = { tagName: parsedTagType[tag], innerText: $content.innerHTML.slice(tag.length).trim() };
			if (isParsedTag) {
				const $newContent = new ContentBlock({ $target, initialState: init });
				$target.replaceChild($newContent.getElement(), $content);
			}
		}
	};
	this.render();
}
