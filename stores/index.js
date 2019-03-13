import BlogStore from './blog'
import MusicStore from './music'
import UserStore from './user'
import ConfigStore from './config'

export default {
  blogStore: new BlogStore(),
  musicStore: new MusicStore(),
  userStore: new UserStore(),
  configStore: new ConfigStore()
}
