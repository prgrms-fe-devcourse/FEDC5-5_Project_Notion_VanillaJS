import { DocumentNode, validateDocumentNode } from "./model.js";
import { initialDocument } from "../../constants/initialData.js";
import { createCommonElement } from "../../services/createCommonElement.js";

import requireNew from "../../services/requireNew.js";

export function DocumentTree({ $target, initialData }) {
    requireNew(new.target);

    const $documentTree = createCommonElement("ul", { class: "document-tree" });

    $target.appendChild($documentTree);

    this.state = initialData;

    this.setState = (nextState) => {
        try {
            validateDocumentNode(nextState);
        } catch (err) {
            console.error(err);
            return;
        }
        this.state = nextState;
        this.render();
    };

    const findRootOf = (node) => {
        if (node.classList.contains("document-node") === false) return null;
        if (node.parentElement.classList.contains("document-tree")) return node;
        return findRootOf(node.parentElement);
    };

    const appendNode = (
        $parentNode,
        currentInstance = new DocumentNode({
            initialData: initialDocument,
            appendNode,
            findRootOf,
        })
    ) => {
        const $container = createCommonElement("li", {
            class: "document-node container",
        });
        const $currentNode = currentInstance.getNode();
        $container.appendChild($currentNode);
        $parentNode.appendChild($container);

        if (currentInstance.documents.length > 0) {
            currentInstance.documents.forEach((documentData) =>
                appendNode(
                    $currentNode,
                    new DocumentNode({
                        initialData: documentData,
                        appendNode,
                        findRootOf,
                    })
                )
            );
        }
    };

    const findNode = (id, currentNode) => {
        if (currentNode?.dataset.id === id.toString()) {
            return currentNode;
        }
        const children = currentNode.children;

        for (const childNode of Object.values(children)) {
            if (childNode.classList.contains("document-node")) {
                const result = findNode(id, childNode);
                if (result != null) {
                    return result;
                }
            }
        }
        return null;
    };

    this.changeTitle = (id, text) => {
        const node = findNode(id, $documentTree);
        if (node != null) {
            node.children.item(0).innerText = text;
        }
    };

    this.render = () => {
        this.state.forEach((documentData) =>
            appendNode(
                $documentTree,
                new DocumentNode({
                    initialData: documentData,
                    appendNode,
                    findRootOf,
                })
            )
        );
    };
    this.render();
}
