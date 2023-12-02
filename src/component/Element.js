export default function makeElement(tag, id, className, parent) {

    const newElement = document.createElement(`${tag}`);
    if (id !== null) newElement.id = id;
    if (className !== null) newElement.className = className;
    if (parent !== null) parent.appendChild(newElement);

    return newElement;
}