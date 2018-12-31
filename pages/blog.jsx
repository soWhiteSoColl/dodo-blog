import React, { Component } from 'react'
import Head from 'next/head'
import ContentsTable from 'widgets/ContentsTable'
import { dateFormater } from 'tools/main'
import CommentGroup from '../components/CommentGroup'

export default class BlogDetail extends Component {
  static async getInitialProps(ctx, store) {
    const id = ctx.query && ctx.query.id
    const blog = await store.blogStore.read(id)
    return { id, blog }
  }

  constructor(props) {
    super(props)
    this.props.blogStore.setValues({ currentBlog: props.blog })
  }

  handleComment = message => {
    const { nickname } = this.props.contactStore
    this.props.blogStore.comment({ message, nickname })
  }

  render() {
    const blog = this.props.blogStore.currentBlog || {}
    const blogDescription = blog.content && blog.content.replace(/<.*?>/g, '').slice(0, 160)
    const blogKeywords = blog.tags ? blog.tags.map(tag => tag.value) : []

    return (
      <React.Fragment>
        <Head>
          <title>{blog.title} - 小寒的博客</title>
          <meta name="keywords" content={blogKeywords.join(',')} />
          <meta name="description" content={blogDescription} />
        </Head>
        <div className="do-content-container blog-detail">
          <h1 className="blog-title"><span>{blog.title}</span></h1>
          <div className="blog-meta">
            <div className="blog-date">{dateFormater(blog.created)}</div>
          </div>
          <div className="blog-wrapper">
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>
          </div>
          <ContentsTable content={blog.content} />
          <CommentGroup
            title={'评论区'}
            list={blog.comments || []}
            onSubmit={this.handleComment}
          />
        </div>
      </React.Fragment>
    )
  }
}
