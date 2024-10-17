import { 
  LaranaComponent,
  TextComponent,
  LayoutComponent,
  BarChartComponent,
  Style,
} from 'larana-js'

let id = 0

export interface VueranaNode {
  id: number
  parent: null | VueranaElement
  render: () => LaranaComponent | string | null | undefined
  payload?: unknown
}

export interface VueranaElement extends VueranaNode {
  props: Record<string, unknown>
  setProps: (props: Record<string, unknown>) => void

  style: Record<string, unknown> | null

  children: VueranaNode[]

  ref: unknown
  refSetter: {
    set current(newRef: unknown);
    get current(): unknown;
  }
}

export function createTextNode(content: string): VueranaNode {
  return {
    payload: content,
    id: id++,
    parent: null,
    render() {
      return this.payload as string
    }
  }
}

export function createCommentNode(content: string) {
  return {
    payload: content,
    id: id++,
    parent: null,
    render() {
      return null
    }
  }
}

const tagsList = {
  text: TextComponent,
  layout: LayoutComponent,
  'bar-chart': BarChartComponent,
} as const satisfies Record<string, LaranaComponent>

export function createNode(tag: string, vnodeProps?: Record<string, any>) {
  const lower = tag.toLowerCase() as keyof typeof tagsList
  const LaranaComponent = tagsList[lower]
  const laranaRender = {
    [tag]: () => {
      const props = { ...element.props }

      if (element.style) {
        props.style = new Style(element.style)
      }

      if (element.children && element.children.length > 0) {
        props.children = element.children.map((child) => child.render()).filter(Boolean)
      }

      // console.log(props.children)

      return new LaranaComponent(props)
    }
  }[tag]

  const element: VueranaElement = {
    id: id++,
    parent: null,
    render: () => laranaRender(),

    props: {},
    setProps(newProps: Record<string, unknown>) {
      element.props = newProps
    },

    children: [],

    ref: null as unknown,
    refSetter: {
      set current(newRef) {
        element.ref = newRef
      },
      get current() {
        return element.ref
      }
    }
  }
  return element
}