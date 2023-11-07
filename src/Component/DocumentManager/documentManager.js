import DocumentEditor from './DocumentEditor/DocumentEditor.js';
import ChildDocumentsViewer from './ChildDocumentsViewer/ChildDocumentsViewer.js';
import { createNewElement } from '../../Util/Element.js';
import { fetchGetDocumentContent, fetchPutDocument } from '../../Service/PostApi.js';
import { DOCUMENT_CONTENT_SAVE_KEY, getItem, setItem, removeItem } from '../../Store/LocalStroage.js';
import DocumentObserver from '../../Util/DocumentObserver.js';
import { DOCUMENT_CHILD_LIST, DOCUMENT_LIST } from '../../Constants/Observer.js';

// state = { documentId : "" }

export default class DocumentManager {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {
        this.$documentManager = createNewElement('div', [{ property: 'className', value: 'document-manager' }]);

        // document 글을 수정하는 editor 컴포넌트 생성
        this.documentEditor = new DocumentEditor({
            $taregt: this.$documentManager,
            initalState: { ...this.state },
            onEditing: (nextState) => {
                clearTimeout(this.timer);
                this.timer = setTimeout(async () => {
                    this.putDocumentContent(nextState);
                }, 1000);
            },
        });
        // 수정 중인 자식 document를 보여주는 childDocumentsViewer 컴포넌트 생성
        this.childDocumentsViewer = new ChildDocumentsViewer({
            $target: this.$documentManager,
            initalState: { documentList: [] },
        });

        this.$target.appendChild(this.$documentManager);

        // sidebar가 수정되면 childList도 리렌더링 해야하므로 documentContent를 불러오는 함수를 구독
        DocumentObserver.getInstance().subscribe(DOCUMENT_CHILD_LIST, () =>
            this.getDocumentContent(this.state.documentId)
        );
        this.getDocumentContent(this.state.documentId);
    }

    // 해당 document content 가져오기
    async getDocumentContent(documentId) {
        const { title, content, updatedAt, documents } = await fetchGetDocumentContent(documentId);
        // 로컬에 저장된 임시 데이터를 불러온다.
        const {
            title: localTitle,
            content: localContent,
            tempSaveData,
        } = getItem(DOCUMENT_CONTENT_SAVE_KEY(documentId), { title: '', content: '' });

        // 임시 데이터가 존재하고 만약 서버에 저장되지 않고 임시 데이터가 최신 내용이라면 사용자에 선택에 따른다.
        if (tempSaveData && tempSaveData > updatedAt) {
            if (confirm('저장되지 않은 데이터가 있습니다. 불러올까요?')) {
                this.childDocumentsViewer.setState({ documentList: documents });
                this.documentEditor.setState({ title: localTitle, content: localContent });
                return;
            }
        }

        this.childDocumentsViewer.setState({ documentList: documents });
        this.documentEditor.setState({ title, content });
    }

    // 해당 document content 수정하기
    async putDocumentContent(nextState) {
        const { documentId } = this.state;
        const { title, content } = nextState;

        // 수정된 내용을 localStorage에 저장한다.
        setItem(DOCUMENT_CONTENT_SAVE_KEY(documentId), {
            ...nextState,
            tempSaveData: new Date(),
        });

        const res = await fetchPutDocument(documentId, title, content);

        if (res) {
            // 만약 수정되었다면 localStorage에 삭제한다.
            removeItem(DOCUMENT_CONTENT_SAVE_KEY(documentId));

            // content와 title이 수정되어도 childList를 다시 불러올 필요가 없어서 미리 제거하고 다시 추가해준다.
            DocumentObserver.getInstance().notifyAll(DOCUMENT_LIST);
        } else {
            alert('수정 실패!');
        }
    }
}
