export const getBreadcrumb = (treeNodes, targetId) => {
	const pathTitle = [];
	const pathId = [];

	const recursion = (treeNodes, targetId) => {
		if (pathId.includes(targetId)) return;

		for (const node of treeNodes) {
			const { id, title, documents } = node;

			pathTitle.push(title);
			pathId.push(id);

			if (targetId === id) return;
			if (documents.length) recursion(documents, targetId);
			if (pathId.includes(targetId)) return;

			pathTitle.pop();
			pathId.pop();
		}
	};
	if (treeNodes.length) recursion(treeNodes, parseInt(targetId));

	return pathTitle.map((value, index) => {
		return { id: pathId[index], title: value };
	});
};
