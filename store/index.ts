import { init } from '@rematch/core'
import blogModel from './blog-model'
import robotModel from './robot-model'
import globalModel from './global-model'


const store = init({
  models: { blogModel, globalModel, robotModel },
})

export default store
