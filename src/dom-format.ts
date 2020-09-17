// import {
//   JsExceptionDTO,
//   ResourceExceptionDTO,
//   ElementTargetDTO,
//   ExceptionDTO,
//   EType,
//   isJsExceptionDTO,
// } from '../interface';
import { compressString } from './file';

export function querySelector(queryString: string) {
  return (
    document.getElementById(queryString) ||
    document.getElementsByName(queryString)[0] ||
    document.querySelector(queryString)
  );
}

export function getDomPath(element: Element, useClass = false) {
  if (!(element instanceof HTMLElement)) {
    console.warn('input is not a HTML element!');
    return '';
  }
  let domPath = [];
  let elem: Element | null = element;
  while (elem) {
    let domDesc = getDomDesc(elem, useClass);
    if (!domDesc) {
      break;
    }
    domPath.unshift(domDesc);
    if (
      querySelector(domPath.join('>')) === element ||
      domDesc.indexOf('body') >= 0
    ) {
      break;
    }
    domPath.shift();
    const children: ArrayLike<Element> = elem.parentNode?.children ?? [];
    if (children.length > 1) {
      for (let i = 0; i < children.length; i++) {
        if (children[i] === elem) {
          domDesc += `:nth-child(${i + 1})`;
          break;
        }
      }
    }
    domPath.unshift(domDesc);
    if (querySelector(domPath.join('>')) === element) {
      break;
    }
    if (elem.parentNode instanceof Element) {
      elem = elem.parentNode;
    } else {
      elem = null;
    }
  }
  return domPath.join('>');
}

export function getDomDesc(element: Element, useClass = false) {
  const domDesc = [];
  if (!element || !element.tagName || !element.localName) {
    return '';
  }
  if (element.id) {
    return `#${element.id}`;
  }
  domDesc.push(element.tagName.toLowerCase());
  if (useClass) {
    const className = element.className;
    if (className && typeof className === 'string') {
      const classes = className.split(/\s+/);
      domDesc.push(`.${classes.join('.')}`);
    }
  }
  if (element.name) {
    domDesc.push(`[name=${element.name}]`);
  }
  return domDesc.join('');
}

export function formatElement(target: Element): ElementTargetDTO {
  return {
    tag: target.localName,
    domPath: getDomPath(target, true),
    // attrs: Array.from(target.attributes).reduce(
    //   (prev: { [key: string]: string }, attr: Attr) => {
    //     prev[attr.name] = attr.value;
    //     return prev;
    //   },
    //   {},
    // ),
    outerHTML: compressString(target.outerHTML),
  };
}
