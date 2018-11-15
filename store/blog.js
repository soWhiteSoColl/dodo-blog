import { observable, action } from 'mobx'
import axios from '../config/axios'
import Base from './base'
export default class Store extends Base {
  @observable blogs = {
    list: [],
    page: 0,  // 现在一共有0页，不是目前在第几页
    perPage: 10,
    noMore: false
  }

  @observable tags = []
  @observable currentBlog = null

  @action
  list = (currnetPage) => {
    if (this.blogs.list.noMore) {
      return false
    }
    this.blogs.page = currnetPage || Number(this.blogs.page) + 1
    const { perPage, page } = this.blogs
    return axios.get('/articles', { params: { perPage, page } })
      .then(blogs => {
        this.blogs.list = currnetPage ? blogs.list : this.blogs.list.concat(blogs.list)
        this.blogs.page = blogs.page
        this.blogs.count = blogs.count
        this.blogs.noMore = this.blogs.list.length >= this.blogs.count
        return this.blogs
      })
  }

  @action
  read = id => {
    axios.put('/articles/' + id + '/view-count')

    return axios.get('/articles/' + id)
      .then(blog => this.currentBlog = blog)
  }

  @action
  comment = comment => {
    const blogId = this.currentBlog._id
    return axios.put('/articles/' + blogId + '/comment', comment)
      .then(blog => this.currentBlog = blog)
  }

  @action
  getTags = () => {
    return axios.get('/articles/tags')
      .then(tags => this.tags = tags)
  }
}