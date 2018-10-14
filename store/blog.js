import { observable, action } from 'mobx'
import axios from 'axios'

export default class Store {
    @observable blogs = {
        list: [],
        page: 0,  // 现在一共有0页，不是目前在第几页
        noMore: false
    }
    @observable currentBlog = null

    @action
    list = () => {
        const perPage = 10
        const page = this.blogs.page + 1
        if (this.blogs.noMore) {
            return Promise.resolve(this.blogs)
        }
        return axios.get('/articles', { params: { perPage, page } })
            .then(blogs => {
                this.blogs.list = this.blogs.list.concat(blogs.list)
                this.blogs.page = Number(blogs.page)
                if (blogs.list.length < 10) {
                    this.blogs.noMore = true
                }
                return this.blogs
            })
    }

    @action
    read = id => {
        return axios.get('/articles/' + id)
            .then(blog => {
                this.currentBlog = blog
                return Promise.resolve(blog)
            })
    }
}