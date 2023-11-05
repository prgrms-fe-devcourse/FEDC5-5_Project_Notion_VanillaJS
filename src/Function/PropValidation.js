export function validatePageProps(prop) {
  if (!prop.updatedAt) {
    throw new Error("updatedAt 에 대한 정보가 없습니다");
  }

  if (!prop.createdAt) {
    throw new Error("createdAt 에 대한 정보가 없습니다");
  }

  if (!typeof prop.content === "string") {
    throw new Error("content 에 대한 정보가 없습니다");
  }

  if (!prop.documents || !Array.isArray(prop.documents)) {
    throw new Error("documents 에 대한 정보가 없습니다");
  }

  if (!typeof prop.title === "string") {
    throw new Error("title 에 대한 정보가 없습니다");
  }

  if (!prop.id && prop.id !== 0) {
    throw new Error("id 에 대한 정보가 없습니다");
  }

  return true;
}

export function validateListProps(prop) {
  if (!typeof prop === "object" || !Array.isArray(prop)) {
    throw new Error("불러온 Documnet List가 'objec' 또는 'Array'가 아닙니다 ");
  }
  return true;
}
