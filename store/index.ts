import { init } from '@rematch/core'
import blogModel from './blog-model'
import globalModel from './global-model'

const store = init({
  models: { blogModel, globalModel },
})

export default store
