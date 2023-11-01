import { request } from "../../utils/api.js";
import { push } from "../../utils/router.js";

export default function SidebarBody({ $target }) {
  const $sidebarBody = document.createElement("div");
  const $renderList = document.createElement("div");
  $sidebarBody.className = "sidebar-body";
  $target.appendChild($sidebarBody);

  this.setState = async () => {
    this.state = await request("/documents", {
      method: "GET",
    });
    $renderList.innerHTML = "";
    this.render();
  };

  const refreshDocuments = async () => {
    $renderList.innerHTML = "";
    await this.setState();
  };

  const addDocument = async (dataId) => {
    const newDocument = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "제목 없음",
        parent: dataId,
      }),
    });

    push(`/documents/${newDocument.id}`);
  };

  const deleteDocument = async (dataId) => {
    await request(`/documents/${dataId}`, {
      method: "DELETE",
    });

    push("/");
  };

  const renderDocuments = (documents, $renderList) => {
    documents.forEach((e) => {
      const $ul = document.createElement("ul");
      const $li = document.createElement("li");

      $li.className = "document-li";
      $li.setAttribute("data-id", e.id);
      $li.textContent = e.title;

      const $addBtn = document.createElement("button");
      $addBtn.className = "add-btn";
      $addBtn.textContent = "+";

      const $deleteBtn = document.createElement("button");
      $deleteBtn.className = "delete-btn";
      $deleteBtn.textContent = "--";

      $renderList.appendChild($ul);

      $ul.appendChild($li);
      $li.appendChild($deleteBtn);
      $li.appendChild($addBtn);

      if (e.documents) {
        renderDocuments(e.documents, $ul);
      }
    });

    return $renderList.innerHTML;
  };

  this.render = () => {
    if (this.state) {
      $sidebarBody.innerHTML = renderDocuments(this.state, $renderList);
    } else {
      $sidebarBody.innerHTML = "페이지 추가 필요";
    }
  };

  this.render();

  $sidebarBody.addEventListener("click", (e) => {
    const target = e.target;
    const dataId = target.closest("li")?.dataset.id;
    if (target.classList.contains("add-btn")) {
      addDocument(dataId);
      refreshDocuments();
    } else if (target.classList.contains("delete-btn")) {
      deleteDocument(dataId);
      refreshDocuments();
    } else if (dataId) {
      push(`/documents/${dataId}`);
    }
  });

  window.addEventListener("postUpdated", refreshDocuments);
}
