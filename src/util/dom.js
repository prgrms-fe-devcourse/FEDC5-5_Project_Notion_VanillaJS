export const createElementWithClass = (tagName, className) => {
	const $dom = document.createElement(tagName);
	$dom.classList.add(className);
	return $dom;
};

export const addEvent = ($dom, className, type, callback) => {
	const $target = $dom.querySelector(`.${className}`);
	$target.addEventListener(type, (e) => callback(e));
};
