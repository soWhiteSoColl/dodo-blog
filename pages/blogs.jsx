import React, { Component } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { observer } from 'mobx-react'

@observer
export default class Blogs extends Component {
    fetchBlogs = () => {
        axios.get('/blogs')
    }

    componentDidMount() {
        this.fetchBlogs()
    }

    render() {
        return (
            <Layout>
                test
            </Layout>
        );
    }
}
