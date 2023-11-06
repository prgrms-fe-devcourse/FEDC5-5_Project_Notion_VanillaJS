import App from "./App.js";

const $app = document.querySelector("#app");

const initiate = async () => {
    const appInstance = new App({ $target: $app });

    const editorInstance = await appInstance.init();

    document.addEventListener("replacestate", (e) =>
        appInstance.onEditor.call(appInstance, e, editorInstance)
    );

    document.addEventListener("removeEditor", () =>
        appInstance.onEditor.call(appInstance, null, editorInstance)
    );

    appInstance.onEditor(true, editorInstance);
};
initiate();
