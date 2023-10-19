import RootContainer from "./Root/RootContainer.js";
import DocumentContainer from "./Document/DocumentContainer.js";

export default function App({ $app }) {
  const $target = document.createElement("div");
  $target.id = "target";

  $app.appendChild($target);
  const document_tree_dummy_data = [
    {
      id: 1, // Document id
      title: "노션을 만들자", // Document title
      documents: [
        {
          id: 2,
          title: "블라블라",
          documents: [
            {
              id: 3,
              title: "함냐함냐",
              documents: [],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: "hello!",
      documents: [],
    },
  ];

  const document_dummy_data = {
    id: 1,
    title: "노션을 만들자",
    content: "즐거운 자바스크립트의 세계!",
    documents: [
      {
        id: 2,
        title: "",
        createdAt: "",
        updatedAt: "",
      },
    ],
    createdAt: "",
    updatedAt: "",
  };

  const initialState = document_tree_dummy_data;

  new RootContainer({
    $target,
    initialState,
    onClick: (documentId) => {
      console.log(documentId);
    },
  });

  new DocumentContainer({
    $target,
    initialState: {
      id: null,
      title: null,
      content: null,
      documents: null,
      createAt: null,
      updatedAt: null,
    },
  });
}
