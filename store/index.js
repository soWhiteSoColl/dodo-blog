import BlogStore from './blog'
import ContactStore from './contact'
import MusicStore from './music'
import UserStore from './user'


export default {
    blogStore: new BlogStore(),
    contactStore: new ContactStore(),
    musicStore: new MusicStore(),
    userStore: new UserStore()
}
