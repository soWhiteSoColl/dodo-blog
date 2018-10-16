import React, { Component } from 'react'
import withLayout from '../components/Layout'
import { dateFilter } from '../util/tool'

class BlogDetail extends Component {
  static async getInitialProps(cxt) {
    const { id } = cxt.query
    return { id }
  }

  componentDidMount() {
    this.props.blogStore.read(this.props.id)
  }

  render() {
    const blog = this.props.blogStore.currentBlog || {}

    return (
      <div className="do-content-container blog-detail">
        <h1 className="blog-title">{blog.title}</h1>
        <div className="blog-author">{blog.author && blog.author.username}</div>
        <div className="blog-author">{dateFilter(blog.created)}</div>
        <div dangerouslySetInnerHTML={{__html: blog.content}}></div>
      </div>
    )
  }
}

export default withLayout(BlogDetail)
