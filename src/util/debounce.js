let timer = null;

const debounce = (callback) => {
	if (timer !== null) {
		clearTimeout(timer);
	}
	timer = setTimeout(() => callback(), 2000);
};

export default debounce;
