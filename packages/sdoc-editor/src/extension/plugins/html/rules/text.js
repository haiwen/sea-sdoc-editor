import slugid from 'slugid';

const textRule = (element, parseChild) => {
  const { nodeName, nodeType, childNodes } = element;
  // If the child node is not a text node, it is processed by the child node
  if (childNodes.length && !(childNodes?.[0] instanceof Text)) return parseChild(childNodes);

  if (nodeName === 'SPAN') {
    return {
      id: slugid.nice(),
      text: element.textContent,
    };
  }

  if (nodeName === 'STRONG' || nodeName === 'B') {
    return {
      id: slugid.nice(),
      bold: true,
      text: element.textContent,
    };
  }

  if (nodeName === 'CODE' && element.parentElement.nodeName !== 'PRE') {
    return {
      id: slugid.nice(),
      code: true,
      text: element.textContent
    };
  }

  if (nodeName === 'DEL') {
    return {
      id: slugid.nice(),
      delete: true,
      text: element.textContent
    };
  }

  if (nodeName === 'I') {
    return {
      id: slugid.nice(),
      italic: true,
      text: element.textContent
    };
  }

  if (nodeName === 'INS') {
    return {
      id: slugid.nice(),
      add: true,
      text: element.textContent
    };
  }

  if (nodeType === 3) {
    return {
      id: slugid.nice(),
      text: element.textContent,
    };
  }

  return;
};

export default textRule;
