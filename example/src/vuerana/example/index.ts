import { createVuerana } from "../vuerana"
import App from "./app.vue"

import { initStyleVars } from '../../styles'
import { router } from './routes'

initStyleVars()

const app = createVuerana(App)    
app.use(router)
app.mount()
