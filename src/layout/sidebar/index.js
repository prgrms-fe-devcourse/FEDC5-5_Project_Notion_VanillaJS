import CreateImg from '@asset/create.png';
import DocumentNav from '@component/sidebar/document-nav';
import { createElementWithClass, addEvent } from '@util/dom';
import { TEXT } from '@util/constant';
import { createDocument } from '@api/document';
import { push } from '@util/router';
import './style.scss';

export default function SideBar({ $target, initialState, handleState }) {
	const $sidebar = createElementWithClass('div', 'sidebar');
	$target.appendChild($sidebar);

	this.state = initialState;
	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	const handleCreateDocument = (newDocument, documentList, id) => {
		if (!id) {
			return [...documentList, newDocument];
		}
		const foundDocument = documentList?.find((document) => document.id === id);
		if (foundDocument) {
			foundDocument.documents.push(newDocument);
			return this.state.documentList;
		}
		documentList.forEach((item) => {
			const itemDocuments = item.documents;
			if (itemDocuments && itemDocuments.length > 0) {
				handleCreateDocument(newDocument, itemDocuments, id);
			}
		});
		return this.state.documentList;
	};

	const handleClickCreate = async (id) => {
		const resposne = await createDocument(TEXT.initTitle, id);
		const newDocument = {
			id: resposne.id,
			title: resposne.title,
			documents: [],
		};
		const newList = handleCreateDocument(newDocument, this.state.documentList, Number(id));
		handleState({
			focusedDocumentId: resposne.id,
			documentList: newList,
		});
		push(`/documents/${resposne.id}`);
	};
	const parseDocumentList = () => {
		const $documentList = $sidebar.querySelector('.sidebar__documentList');
		const { documentList, focusedDocumentId } = this.state;
		return documentList.map(
			(document) =>
				new DocumentNav({
					$target: $documentList,
					initialState: document,
					handleState,
					focusedDocumentId,
					handleClickCreate,
				})
		);
	};

	this.render = () => {
		$sidebar.innerHTML = `
		<div class="sidebar__info">   
			<span class="sidebar__info-emoji">👀</span>
			<span class="sidebar__info-text">유경 Notion</span>
		</div>
		<div class="sidebar__documentCreateBtn">
			<img src=${CreateImg} alt="createBtnRootImg" class="sidebar__documentCreateBtn-img"  />
			<span class="sidebar__documentCreateBtn-text"/>새 페이지</span>
		</div>
		<div class="sidebar__documentList" role="tabList"></div>
		`;
		if (this.state && this.state.documentList?.length > 0) parseDocumentList();
		addEvent($sidebar, 'sidebar__documentCreateBtn-img', 'click', () => handleClickCreate(null));
	};
	this.render();
}
