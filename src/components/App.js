import SideBar from "./SideBar.js";
import PostEdit from "./PostEdit.js";

import { updateEditingPostToSideBar } from "../utils/dataManager.js";
export default function App({
	$target,
	initialSideBarState,
	initialEditorState,
}) {
	const $main = document.createElement("main");
	$target.appendChild($main);

	const sideBar = new SideBar({
		$target: $main,
		initialState: initialSideBarState,
		setPostIdState: (id) => {
			const nextState = { id };
			editor.setState(nextState);
		},
	});

	const editor = new PostEdit({
		$target: $main,
		initalState: initialEditorState,
		setSideBarState: (editingPostData) => {
			const nextState = updateEditingPostToSideBar(
				sideBar.state,
				editingPostData
			);
			sideBar.setState(nextState);
		},
	});
}
