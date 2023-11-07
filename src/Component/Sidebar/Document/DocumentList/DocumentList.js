import DocumentItems from '../../../Common/DocumentItems/DocumentItems.js';
import { createNewElement } from '../../../../Util/Element.js';
import { fetchDeleteDocument, fetchGetDocumentList, fetchPostDocument } from '../../../../Service/PostApi.js';
import RouterManger from '../../../../Util/Router.js';
import DocumentObserver from '../../../../Util/DocumentObserver.js';
import { DOCUMENT_CHILD_LIST, DOCUMENT_LIST } from '../../../../Constants/Observer.js';
import { DOCUMENT_TOGGLE_KEY, setItem, getItem } from '../../../../Store/LocalStroage.js';

// state = { documentList: [] }

export default class DocumentList {
    constructor({ $target, initalState }) {
        this.$target = $target;
        this.state = initalState;

        this.init();
    }

    init() {
        this.$documentList = createNewElement('div', [{ property: 'className', value: 'document-list' }]);

        this.$target.appendChild(this.$documentList);
        this.$documentList.addEventListener('click', (e) => this.handleOnClick(e));

        // documetList 데이터를 다시 불러오는 함수를 구독
        DocumentObserver.getInstance().subscribe(DOCUMENT_LIST, () => this.getDocumentList());
        this.getDocumentList();
        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        const { documentList } = this.state;

        // 자식 노드를 모두 제거
        this.$documentList.replaceChildren();

        if (!documentList || documentList.length === 0) {
            return;
        }

        // 첫 DocumentItems의 ul태그는 root를 기준으로 생성
        new DocumentItems({
            $target: this.$documentList,
            initalState: { documentList, isRoot: true, documentId: null },
        });
    }

    async handleOnClick(e) {
        const {
            target,
            target: { className },
        } = e;

        // 하위 자식 보기 toggle 버튼
        if (className === 'title-toggle__toggle--view' || className === 'title-toggle__toggle--hidden') {
            const $ul = target.closest('.document-item').querySelector('ul');
            const documentId = target.closest('.document-item').dataset.id;
            const toggleList = getItem(DOCUMENT_TOGGLE_KEY, []);

            target.classList.toggle('title-toggle__toggle--view');
            target.classList.toggle('title-toggle__toggle--hidden');
            $ul.classList.toggle('view');

            // 하위 리스트가 있고 하위 document를 열람한 상태고 localStorage에 존재하지 않는 id라면
            if ($ul && target.className === 'title-toggle__toggle--view' && !toggleList.includes(documentId)) {
                // localStoraget에 새로운 열람 상태의 id를 추가
                setItem(DOCUMENT_TOGGLE_KEY, [...toggleList, documentId]);
            }
            // 하위 리스트가 있고 하위 document를 미열람한 상태고 localStorage에 존재하는 id라면
            else if ($ul && target.className === 'title-toggle__toggle--hidden' && toggleList.includes(documentId)) {
                // localStoraget에 열람 상태의 id 제거
                setItem(
                    DOCUMENT_TOGGLE_KEY,
                    toggleList.filter((id) => String(id) !== documentId)
                );
            }
        }

        // document 추가 이벤트
        if (className === 'insert-delete__insert') {
            const $li = target.closest('.document-item');
            const documentId = $li.dataset.id;

            await this.postDocument(documentId);
            // editor page의 documentChilde 컴포넌트에게 알림을 준다
            DocumentObserver.getInstance().notifyAll(DOCUMENT_LIST);
            DocumentObserver.getInstance().notifyAll(DOCUMENT_CHILD_LIST);
        }

        // document 삭제 이벤트
        if (className === 'insert-delete__delete') {
            const documentId = target.closest('.document-item').dataset.id;
            const path = window.location.pathname.split('/')[2];

            await this.deleteDocument(documentId);

            // 삭제한 documentId와 현재 editor 작성하고 있는 editor 페이지가 같다면
            if (Number(documentId) === Number(path)) {
                // 그냥 rootPage로 다시 이동한다.
                RouterManger.getInstance().changeUrl(`/`);
            } else {
                // 아니면 documentList가 변경됨을 documentChild 컴포넌트에게 알림을 준다.
                DocumentObserver.getInstance().notifyAll(DOCUMENT_LIST);
                DocumentObserver.getInstance().notifyAll(DOCUMENT_CHILD_LIST);
            }
        }

        // 해당 document 페이지로 이동하는 이벤트
        if (className === 'title-toggle__title') {
            const documentId = target.closest('.document-item').dataset.id;

            // 해당 페이지로 이동
            RouterManger.getInstance().changeUrl(`/document/${documentId}`);
            // 현재 머물고 있는 document를 리렌더링하기 위해 데이터를 다시 가져온다.
            this.getDocumentList();
        }
    }

    // document 데이터 가져오기
    async getDocumentList() {
        const res = await fetchGetDocumentList();

        if (res) {
            this.setState({ documentList: res });
        }
    }

    // document 데이터 추가하기
    async postDocument(documentId) {
        if (!documentId) {
            return;
        }
        const res = await fetchPostDocument(documentId);
        const toggleList = getItem(DOCUMENT_TOGGLE_KEY, []);

        if (res) {
            // 데이터가 추가되면 바로 볼 수 있게 toggle 목록에 삽입한다.
            if (!toggleList.includes(documentId)) {
                setItem(DOCUMENT_TOGGLE_KEY, [...toggleList, documentId]);
            }
            this.getDocumentList();
        }
    }

    // document 데이터 삭제하기
    async deleteDocument(documentId) {
        if (!documentId) {
            return;
        }
        const res = await fetchDeleteDocument(documentId);
        const toggleList = getItem(DOCUMENT_TOGGLE_KEY, []);

        if (res) {
            // 데이터가 삭제되면 toggle 목록에서 삭제해준다.
            setItem(
                DOCUMENT_TOGGLE_KEY,
                toggleList.filter((id) => String(id) !== documentId)
            );
            this.getDocumentList();
        }
    }
}
