import {
  createCommentNode,
  createNode,
  createTextNode,
  type VueranaElement,
  type VueranaNode,
} from './createNode'

function noop(fn: string): never {
  throw Error(`no-op: ${fn}`)
}

export const createNodeOps = (rerender: () => void) => {
  return {
    createElement(tag: string, _isSvg?: any, _isCustomElement?: any, vnodeProps?: Record<string, unknown>): VueranaElement {
      return createNode(tag, vnodeProps)
    },

    createText(text: string): VueranaNode {
      return createTextNode(text)
    },

    createComment(text: string): VueranaNode {
      return createCommentNode(text)
    },

    patchProp(el: VueranaElement, key: string, _prevVal: any, nextVal: any) {
      if (key === 'style') {
        el.style = nextVal
      } else {
        el.props[key] = nextVal
      }

      rerender()
    },

    insert(child: VueranaNode, parent: VueranaElement, anchor: VueranaNode) {
      child.parent = parent
      const index = parent.children.indexOf(anchor)
      parent.children.splice(index !== -1 ? index : parent.children.length, 0, child)

      rerender()
    },

    setText(node: VueranaNode, text: string) {
      node.payload = text

      rerender()
    },

    setElementText(node: VueranaElement, text: string) {
      node.children = [createTextNode(text)]

      rerender()
    },

    parentNode(node: VueranaElement) {
      return node.parent
    },

    nextSibling(node: VueranaNode) {
      const pos = node.parent?.children.indexOf(node)!
      return node.parent?.children[pos + 1]!
    },

    setScopeId(node: VueranaElement, id: string) {
      node.props[id] = ''
    },

    remove(node: VueranaNode) {
      const children = node.parent!.children
      children.splice(children.indexOf(node), 1)
      node.parent = null

      rerender()
    },

    querySelector() {
      noop('querySelector')
    },

    insertStaticContent() {
      noop('insertStaticContent')
    },

    cloneNode() {
      noop('cloneNode')
    },
  }
}
