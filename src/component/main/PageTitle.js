import makeElement from "../Element.js";

export default class PageTitle {
    constructor(rootElelment) {
        this.titleElement = makeElement('p', null, "pageTitle", rootElelment);

        this.setBreadCrumb();
    }

    setBreadCrumb(id) {
        if (!id) return;
        const title = this.findParentTracking(id);
        this.titleElement.textContent = title.join(" / ");
    }

    findParentTracking(id) {
        let node = document.querySelector(`#l${id}`);
        const documentNodeTrackArr = [node.getAttribute("titlename")]
        while (node.parentElement.parentElement.getAttribute("titlename")) {
            node = node.parentElement.parentElement;
            documentNodeTrackArr.push(node.getAttribute("titlename"));
        }
        return documentNodeTrackArr.reverse();
    }
}