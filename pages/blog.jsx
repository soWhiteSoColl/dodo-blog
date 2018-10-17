import React, { Component } from 'react'
import withLayout from '../components/Layout'
import { dateFilter } from '../util/tool'
import Link from 'next/link'


const Header = () => {
  return (
    <header className="main-header">
      <div className="do-common-container">
        <div className="logo-brand">
          <Link href="/index">
            <a><img src="/static/dodo-logo.png" alt="" /></a>
          </Link>
        </div>
        <div className="do-pull-right">
          <Link href="/blogs">
            <a>列表</a>
          </Link>
        </div>
      </div>
    </header>
  )
}
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
        <div className="blog-content">
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>
      </div>
    )
  }
}

export default withLayout(BlogDetail, { headerComponent: <Header/> })
