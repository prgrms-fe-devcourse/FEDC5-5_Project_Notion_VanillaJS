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
