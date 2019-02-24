import BlogStore from './blog'
import MusicStore from './music'
import UserStore from './user'

export default {
  blogStore: new BlogStore(),
  musicStore: new MusicStore(),
  userStore: new UserStore()
}
