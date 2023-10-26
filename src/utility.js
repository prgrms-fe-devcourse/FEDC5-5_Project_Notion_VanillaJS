import { asyncDataObj } from "./api.js";

export const getLocalSaveKey = (id) => `NOTION_CLONE_TEMP_${id}`;

export const editorCommands = [
  { command: "bold", label: "bold", icon: "/svg/bold.svg" },
  { command: "italic", label: "italic", icon: "/svg/italic.svg" },
  { command: "underline", label: "underline", icon: "/svg/underline.svg" },
  {
    command: "strikethrough",
    label: "strikethrough",
    icon: "/svg/strikethrough.svg",
  },
  { command: "justifyLeft", label: "Align Left", icon: "/svg/align-left.svg" },
  {
    command: "justifyCenter",
    label: "Align Center",
    icon: "/svg/align-center.svg",
  },
  {
    command: "justifyRight",
    label: "Align Right",
    icon: "/svg/align-right.svg",
  },
];

export const getFlatDocuments = (asyncDocumentsData) => {
  const { isLoading, isError, data } = asyncDocumentsData;

  if (isLoading) return { ...asyncDataObj, isLoading: true };
  else if (isError) return { ...asyncDataObj, isError: isError };

  const flatDocuments = [];

  function recursion(documents) {
    for (const document of documents) {
      if (document.title.length > 0) {
        flatDocuments.push({ id: document.id, title: document.title });
      }

      if (document.documents && document.documents.length > 0) {
        recursion(document.documents);
      }
    }
  }

  recursion(data);

  return { ...asyncDataObj, data: flatDocuments };
};

export const compareObject = (obj1, obj2) => {
  const jsonObj1 = JSON.stringify(obj1);
  const jsonObj2 = JSON.stringify(obj2);

  return {
    isSame: jsonObj1 === jsonObj2,
    isDifferent: jsonObj1 !== jsonObj2,
  };
};
