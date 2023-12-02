const ROUTE_CHANGE_EVENT = 'route-change';

export const push = (url) => {
	window.dispatchEvent(
		new CustomEvent(ROUTE_CHANGE_EVENT, {
			detail: {
				url,
			},
		}),
	);
};

export const initRouter = (onRoute) => {
	window.addEventListener(ROUTE_CHANGE_EVENT, (event) => {
		const { url } = event.detail;

		if (url) {
			history.pushState(null, null, url);
			onRoute();
		}
	});
};
