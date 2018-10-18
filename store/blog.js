import { observable, action } from 'mobx'
import axios from '../config/axios'
import Base from './base'
export default class Store extends Base{
    @observable blogs = {
        list: [],
        page: 0,  // 现在一共有0页，不是目前在第几页
        perPage: 10,
        noMore: false
    }
    @observable currentBlog = null

    @action
    list = () => {
        this.blogs.page = this.blogs.page + 1
        const { perPage, page } = this.blogs
        return axios.get('/articles', { params: { perPage, page } })
            .then(blogs => {
                this.blogs.list = this.blogs.list.concat(blogs.list)
                this.blogs.page = blogs.page
                this.blogs.count = blogs.count
                if(this.blogs.list.length >= this.blogs.count){
                    this.blogs.noMore = true
                }
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