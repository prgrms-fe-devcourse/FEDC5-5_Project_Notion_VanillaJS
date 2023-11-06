import { getDocumentContent } from "./apiManager/index.js";


export function customReplaceStateEvent(id) {
    return new CustomEvent("replacestate", {
        detail: {
            documentId: id,
        },
    });
}

export function customDeleteEvent() {
    return new CustomEvent("removeEditor");
} 

export const handleRouteChange = (e) => {
    const path = location.pathname;
    for (const [route, handler] of Object.entries(routes)) {
        const reg = new RegExp(route);
        if (reg.test(path)) {
            return handler(e);
        }
    }
};

const homeHandler = () => {
    return null;
};

const documentIdHandler = async (event) => {
    console.log(event);
    try {
        if (event instanceof CustomEvent) {
            const content = await getDocumentContent(event.detail.documentId);
            return content;
        } else {
            const content = await getDocumentContent(
                location.pathname.replace("/document/", "")
                );
                console.log(content);
            return content;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
};

const routes = {
    "^/$": homeHandler,
    "^/document/\\w+$": documentIdHandler,
};
