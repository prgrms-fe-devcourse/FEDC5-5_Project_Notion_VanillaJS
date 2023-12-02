export default function Header({ $target, initialState }) {
	const $div = document.createElement('div');

	this.state = initialState;

	$div.innerHTML = `<p style="padding-left:12px;">${this.state}</p>`;
	$target.appendChild($div);
}
