import { Component, jsx } from "@seongbin9786/my-renderer";

// TODO: 문서 탐색 시 breadcrumb 갱신하기
// TODO: 아 문서 탐색은 좀 걸리겠는데?

// 미리 로딩된 List와 Current Document가 필요함.
export class Layout extends Component {
    // TODO: document가 없을 때의 화면 = ?
    // 아니면 Editor 말고 BlankEditorPlaceholder 같은 화면 만드는 것도 괜찮을 듯
    render() {
        const { rootDocumentList, currentDocument } = this.props;

        return jsx`
            <div id=notion-app>
                <Sidebar rootDocumentList=${rootDocumentList} />
                <Header />
                <Editor currentDocument=${currentDocument} />
            </div>
        `;
    }
}
