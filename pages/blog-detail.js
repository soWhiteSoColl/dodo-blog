import React, { Component } from 'react';
import withLayout from '../components/Layout'
import { dateFilter, getLocationQuery } from '../util/tool'

class BlogDetail extends Component {
    static async getInitialProps(cxt, store) {
        const {id} = cxt.query
        let blog = await store.blogStore.read(id)
        return { blog }
    }
    render() {
        const { blog = {} } = this.props
        return (
            <div className="do-content-container blog-detail">
                <h1 className="blog-title">{blog.title}</h1>
                <div className="blog-author">{blog.author && blog.author.username}</div>
                <div className="blog-author">{dateFilter(blog.created_at)}</div>
                <div className="blog-content" dangerouslySetInnerHTML={{__html: blog.content}} />
            </div>
        );
    }
}

export default withLayout(BlogDetail);
