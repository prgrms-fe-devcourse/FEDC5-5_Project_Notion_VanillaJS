import { commonAttributes } from "../constants/commonAttributes.js";

/** DOM을 생성하는 함수입니다
 * @param {string} tagName
 * @param {object} props
 * @param {HTMLElement[]} children
 * @description [[[ 주의 ]]] - 추가하려는 속성의 값이 정상적인지는 검사하지 않음!!!
 */
export function createCommonElement(tagName, props = {}, ...children) {
    const element = new DocumentFragment();

    if (isValidTagName(tagName)) {
        element.appendChild(document.createElement(tagName));
    } else {
        throw new Error(
            `정상적인 태그 이름이 아닙니다.\nError tagName : ${tagName}`
        );
    }

    if (props && typeof props === "object") {
        for (const [attrName, value] of Object.entries(props)) {
            if (isValidAttributeName(tagName, attrName)) {
                element.firstChild.setAttribute(attrName, value);
            } else {
                throw new Error(
                    `생성하려는 태그에 넣을 속성을 확인해주세요.\n태그 이름 : ${tagName}\n속성 이름 : ${attrName}\n속성 값 : ${value}`
                );
            }
        }
    } else {
        throw new Error(
            `생성하려는 태그의 입력 속성을 객체로 감싸주세요.\nError props type : ${typeof props}`
        );
    }

    if (children && children.length > 0) {
        for (const child of children) {
            if (isValidElement(child)) {
                element.firstChild.appendChild(child);
            } else if (typeof child === "string") {
                const textNode = document.createTextNode(child);
                element.firstChild.appendChild(textNode);
            } else {
                throw new Error(
                    `생성하려는 태그의 자식 노드를 확인해주세요.\nCurrent Children : ${children}\nError child : ${child}`
                );
            }
        }
    }

    return element.firstChild;
}

function isValidTagName(tagName) {
    const element = document.createElement(tagName);
    return !(element instanceof HTMLUnknownElement);
}

function isValidAttributeName(tagName, attrName) {
    return (
        commonAttributes[tagName]?.includes(attrName) ||
        commonAttributes["Global Attributes"].includes(attrName) ||
        attrName.startsWith("data-")
    );
}

function isValidElement(element) {
    return element instanceof Element || element instanceof Text;
}
