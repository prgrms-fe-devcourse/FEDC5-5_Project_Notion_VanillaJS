import { createComponent } from "./core";
import { Editor, NotFound, Sidebar, UserGuide } from "./components";
import { useDocuments } from "./hooks";
import styles from "./app.module.scss";

const { s_container, s_mainContainer } = styles;

function App() {
  const { documents, createDocument, modifyDocument, removeDocument } = useDocuments();

  const matchRoute = (path: string) => {
    if (path === "/") {
      return createComponent(UserGuide);
    }

    const documentMatch = path.match(/^\/documents\/(\d+)$/);

    if (documentMatch) {
      const documentId = Number(documentMatch[1]);
      return createComponent(Editor, { documentId, modifyDocument });
    }

    return createComponent(NotFound);
  };

  const sidebarComponent = createComponent(Sidebar, { documents, createDocument, removeDocument });
  const mainComponent = matchRoute(window.location.pathname);

  const bindEvents = () => {
    sidebarComponent.bindEvents?.();
    mainComponent.bindEvents?.();
  };

  return {
    element: `
      <div class=${s_container}>
        ${sidebarComponent.element}
        <main class=${s_mainContainer}>
          ${mainComponent.element}
        </main>
      </div>
    `,
    bindEvents,
  };
}

export default App;
