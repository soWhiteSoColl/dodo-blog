import React, { Component } from 'react';
import withLayout from '../components/Layout'
import { dateFilter } from '../util/tool'
// import { DraftViewer } from 'minieditor'
import {Head} from 'next'

class BlogDetail extends Component {
    static async getInitialProps(cxt, store) {
        const { id } = cxt.query
        let blog = await store.blogStore.read(id)
        return { blog }
    }
    render() {
        const { blog = {} } = this.props
        return (
            <React.Fragment>
                <Head>
                    <title>{blog.title}</title>
                </Head>
                <div className="do-content-container blog-detail">
                <h1 className="blog-title">{blog.title}</h1>
                <div className="blog-author">{blog.author && blog.author.username}</div>
                <div className="blog-author">{dateFilter(blog.created)}</div>
                {/* {blog.content && <DraftViewer content={blog.content} />} */}
            </div>
            </React.Fragment>
        );
    }
}

export default withLayout(BlogDetail);
