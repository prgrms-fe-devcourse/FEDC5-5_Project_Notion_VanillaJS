import { DocumentTree } from "./components/DocumentTree/index.js";
import { Editor } from "./components/Editor.js";
import { initialContent } from "./constants/initialData.js";
import { getRootDocument } from "./services/apiManager/index.js";
import requireNew from "./services/requireNew.js";
import { handleRouteChange } from "./services/router.js";

function App({ $target }) {
    requireNew(new.target);

    this.init = async () => {
        const initialRootDocument = await getRootDocument();
        const documentTreeInstance = new DocumentTree({
            $target,
            initialData: initialRootDocument,
        });

        const editorInstance = new Editor({
            $target,
            initialContent,
            changeTitle: (id, text) =>
                documentTreeInstance.changeTitle(id, text),
        });

        return editorInstance;
    };

    this.onEditor = async (event, editorInstance) => {
        const content = event != null ? await handleRouteChange(event) : null;
        if (content != null) {
            editorInstance.appendEditor();
            editorInstance.setState(content);
        } else {
            editorInstance?.removeEditor();
        }
    };
}

export default App;
