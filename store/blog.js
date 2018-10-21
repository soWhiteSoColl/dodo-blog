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
        console.log(id)
        console.log('/articles/' + id)
        return axios.get('/articles/' + id)
            .then(blog => {
                this.currentBlog = blog
                return Promise.resolve(blog)
            })
            .catch(err => {
                console.log('lalal', err)
            })
    }
}