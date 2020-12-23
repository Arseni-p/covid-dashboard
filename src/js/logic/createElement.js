export function createElement(elementType, parentElement, className) {
    const element = document.createElement(elementType);
    if (className) {
        element.className = className;
    }
    parentElement.appendChild(element);
    return element;
}

export default createElement;
