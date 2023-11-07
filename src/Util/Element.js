export const createNewElement = (tag, properties = [], text = '') => {
    const $element = document.createElement(tag);

    if (text) {
        $element.innerText = text;
    }

    properties.forEach(({ property, value }) => {
        if (property.includes('dataset.')) {
            const dataAttribute = property.split('.')[1];
            $element.dataset[dataAttribute] = value;
        } else {
            $element[property] = value;
        }
    });

    return $element;
};
