import { observable, action } from 'mobx'
import axios from '../config/axios'
import Base from './base'
import qs from 'qs'

export default class Store extends Base {
  @observable blogs = {
    list: [],
    page: 0, // 现在一共有0页，不是目前在第几页
    perPage: 100,
    noMore: false,
    tags: []
  }

  @observable tags = []
  @observable hotBlogs = []
  @observable currentBlog = null
  @observable currentBlogComments = null

  @action
  list = opt => {
    const { page: currnetPage, tags: currentTags } = opt || {}
    if (this.blogs.list.noMore) return false
    this.blogs.page = currnetPage || Number(this.blogs.page) + 1
    this.blogs.tags = currentTags || this.blogs.tags
    const { perPage, page, tags } = this.blogs
    return axios
      .get('/articles', {
        params: { perPage, page, tags },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      })
      .then(blogs => {
        if (blogs.list.length < this.blogs.perPage) this.blogs.noMore = true
        this.blogs.list = currnetPage ? blogs.list : this.blogs.list.concat(blogs.list)
        this.blogs.page = blogs.page
        this.blogs.count = blogs.count
        return this.blogs
      })
  }

  @action
  read = id => {
    axios.put('/articles/' + id + '/view-count')

    return axios.get('/articles/' + id).then(blog => (this.currentBlog = blog))
  }

  @action
  comment = comment => {
    if (!comment.blog) {
      comment.blog = this.currentBlog._id
    }
    return axios.post('/leaved-messages', comment).then(() => this.getComments())
  }

  @action
  getTags = () => {
    return axios.get('/articles/tags').then(tags => (this.tags = tags))
  }

  @action
  getHotBlogs = () => {
    return axios
      .get('/articles', { params: { perPage: 3, sort: '-viewCount' } })
      .then(blogs => (this.hotBlogs = blogs.list))
  }

  @action
  getComments = blog => {
    return axios.get('/leaved-messages', { params: { blog: blog || this.currentBlog._id } }).then(comments => {
      return (this.currentBlogComments = comments.list)
    })
  }
}
