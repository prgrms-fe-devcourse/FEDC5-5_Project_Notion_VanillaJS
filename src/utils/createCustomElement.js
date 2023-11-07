export const createCustomElement = ({tag, props, children=[]}) => {
    const $element = document.createElement(tag);

    for (const prop in props) {
        $element[prop] = props[prop];
    }

    if (children.length > 0) {
        children.forEach((child) => $element.appendChild(child));
    }

    return $element;
}