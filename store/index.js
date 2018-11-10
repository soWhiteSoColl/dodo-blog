import BlogStore from './blog'
import ContactStore from './contact'
import MusicStore from './music'

export default {
    blogStore: new BlogStore(),
    contactStore: new ContactStore(),
    musicStore: new MusicStore()
}
