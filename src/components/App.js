import { Component, jsx } from "@seongbin9786/my-renderer";

export class App extends Component {
    state = {
        nextId: this.parseDocumentIdFromUrl(),
        rootDocumentList: null,
        currentDocument: null,
    };

    constructor(props) {
        super(props);
    }

    async fetchApi(currentDocumentId) {
        const rootDocumentList = await window.api.list();

        // 기본으로 목록 중 첫 문서를 현재 문서로 사용
        const id = currentDocumentId ?? rootDocumentList[0].id;
        const currentDocument = await window.api.content(id);

        this.setState({
            rootDocumentList,
            currentDocument,
            nextId: id,
        });
    }

    parseDocumentIdFromUrl() {
        // /documents/120510
        const path = window.location.pathname;

        const matched = path.match(/\/documents\/(\d+)\/?/);
        if (!matched || matched.length < 2) {
            return null; // ??로 체크함.
        }

        const id = Number(matched[1]);

        return id;
    }

    componentDidMount() {
        // popstate 이벤트 수신
        // 문제: 뒤로가기 할 때만 발생하는데..? --> pushState 할 때마다 발행하기로
        window.addEventListener("popstate", async () => {
            const nextId = this.parseDocumentIdFromUrl();
            await this.fetchApi(nextId);
        });
        this.fetchApi(this.state.nextId);
    }

    render() {
        const { rootDocumentList, currentDocument } = this.state;

        // 최초 렌더링
        if (!rootDocumentList) {
            return null;
        }

        return jsx`
            <Layout
                rootDocumentList=${rootDocumentList}
                currentDocument=${currentDocument}
            />
        `;
    }
}
