import { createVuerana } from "@larana/vuerana"
import App from "./app.vue"

import { initStyleVars } from './vars'
import { router } from './routes'

initStyleVars()

const app = createVuerana(App)    
app.use(router)
app.mount()
