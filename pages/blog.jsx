import React, { Component } from 'react'
import withLayout from '../components/Layout'
import { dateFormater } from '../util/tool'
import Link from 'next/link'
import Head from 'next/head'

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
  static async getInitialProps(ctx, store) {
    const id = ctx.req.params.blogId
    let blog = await store.blogStore.read(id)
    return { id, blog }
  }

  render() {
    const blog = this.props.blog || {}
    const blogDescription = blog.content.replace(/<.*?>/g, '').slice(0, 160)
    return (
      <React.Fragment>
        <Head>
          <title>{blog.title}</title>
          <meta name="keywords" content={blog.tags ? blog.tags.join(',') : '博客 技术 前端'}/>
          <meta name="description" content={blogDescription}/>
        </Head>
        <div className="do-content-container blog-detail">
          <h1 className="blog-title"><a href="#">{blog.title}</a></h1>
          <div className="blog-author">{blog.author && blog.author.username}</div>
          <div className="blog-date">{dateFormater(blog.created)}</div>
          <div className="blog-content">
            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </div>
        </div>
      </React.Fragment>

    )
  }
}

export default withLayout(BlogDetail, { headerComponent: <Header /> })
