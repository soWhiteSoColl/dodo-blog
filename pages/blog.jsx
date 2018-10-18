import React, { Component } from 'react'
import withLayout from '../components/Layout'
import { dateFormater } from '../util/tool'
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
  static async getInitialProps(cxt, store) {
    const { id } = cxt.query
    let blog = await store.blogStore.read(id)
    return { id, blog }
  }
 
  render() {
    const blog = this.props.blog || {}

    return (
      <div className="do-content-container blog-detail">
        <h1 className="blog-title"><a href="#">{blog.title}</a></h1>
        <div className="blog-author">{blog.author && blog.author.username}</div>
        <div className="blog-date">{dateFormater(blog.created)}</div>
        <div className="blog-content">
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>
      </div>
    )
  }
}

export default withLayout(BlogDetail, { headerComponent: <Header /> })
