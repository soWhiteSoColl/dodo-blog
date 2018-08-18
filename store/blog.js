import { observable, action } from 'mobx'
import axios from 'axios'

export default class Store {
    @observable blogs = {
        count: 0,
        list: []
    }
    @observable currentBlog = null

    @action
    list = () => {
        return axios.get('/acticles')
            .then(blogs => {
                this.blogs = blogs
                return Promise.resolve(blogs)
            })
    }

    @action
    read = id => {
        return axios.get('/acticles/' + id)
            .then(blog => {
                this.currentBlog = blog
                return Promise.resolve(blog)
            })
    }
}