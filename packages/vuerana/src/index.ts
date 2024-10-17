import { 
  LaranaApp,
  createConfig,
  ServerRenderer,
  MemoryStateManager,
  DefaultRouter,
  Page,
  LayoutComponent,
} from 'larana-js'
import { type Component, createApp, createRenderer, type Plugin } from 'vue'
import { createNodeOps } from './renderer/nodeOps'
import type { VueranaElement } from './renderer/createNode'

type VueApp = ReturnType<typeof createApp>

function vueRoutesToLaranaRoutes(ctx: VueranaVueContext) {
  return ctx.routes.map((route) => {
    class VueranaPage extends Page {
      title = route.meta.title || 'Larana Unknown Page'

      rerenderTimeout: NodeJS.Timeout | null = null

      state!: {
        rootChild: VueranaElement
      }

      rerenderWithTimeout() {
        if (!this.rerenderTimeout) {
          this.rerenderTimeout = setTimeout(() => {
            console.log('rerender')
            this.rerender()
            this.rerenderTimeout = null
          }, 0)
        }
      }

      init() {
        const nodeOps = createNodeOps(() => this.rerenderWithTimeout())
        const app = createRenderer(nodeOps).createApp(ctx.appComponent)

        for (const plugin of ctx.plugins) {
          app.use(plugin)
        }

        this.state = { 
          rootChild: {
            props: {},
            setProps(props: any) {
              this.props = props
            },

            ref: null,
            refSetter: {
              set current(newRef: unknown) {},
              get current() { return null },
            },
            parent: null,
            children: [],
            id: -1,
            render() {
              return this.children.map((child) => child.render())[0]
            },
          }
        }

        this.hello = this.state.rootChild

        const root = app.mount(this.state.rootChild)
        root.$router.push(this.route.url)
      } 

      prepareRoot() {
        return this.hello?.render() ?? new LayoutComponent({})
      }
    }

    return {
      path: route.path,
      name: route.name,
      page: VueranaPage,
    }
  })
}

interface VueranaVueContext {
  appComponent: Component
  plugins: Plugin<any>[]
  routes: any[]
}

export class Vuerana implements LaranaApp, VueApp {
	private laranaApp: LaranaApp
  private vueContext: VueranaVueContext
  private config: ReturnType<typeof createConfig>

  constructor(app: Component) {
    this.vueContext = {
      appComponent: app,
      plugins: [],
      routes: [],
    }

    this.config = createConfig({
      debug: true,
      port: 3000,
      wsPath: 'ws://localhost:3000/',
      maxFPS: 60,
      maxBandwidth: 10 * 1024, // 10 kb TODO
      sessionLifetime: 5 * (60 * 1000), // 5 minutes
      storePreviousRender: true, 
    })
	}

  use(plugin: Plugin<any>) {
    this.vueContext.plugins.push(plugin)
    
    if ('currentRoute' in plugin) {
      this.vueContext.routes = plugin.getRoutes()
    }

    return this
  }

  mount() {
    this.laranaApp = new LaranaApp({
			config: this.config,

			renderer: new ServerRenderer({
        debug: this.config.debug,
        DRM: false,
        maxFPS: this.config.maxFPS,
      }),
			
      stateManager: new MemoryStateManager({
        debug: this.config.debug,
      }),

			router: new DefaultRouter({
        debug: this.config.debug,
        routes: vueRoutesToLaranaRoutes(this.vueContext),
      }),
		})

    return this.laranaApp.run()
  }
}

export function createVuerana(app: Component) {
  return new Vuerana(app)
}
