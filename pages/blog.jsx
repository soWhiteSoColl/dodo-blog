import React, { Component } from 'react'
import { dateFormater } from 'tools'
import Head from 'next/head'
import { InputArea, Button } from 'dodoui'
import Comment from 'widgets/Comment'
import checkNickname from 'util/checkNickname'
import Blog from 'widgets/Blog'


export default class BlogDetail extends Component {
  static async getInitialProps(ctx, store) {
    let id = ctx.query && ctx.query.id
    let blog = await store.blogStore.read(id)
    return { id, blog }
  }

  state = {
    comment: ''
  }

  componentDidMount() {
    this.props.blogStore.setValue('currentBlog', this.props.blog)
    // this.props.contactStore.getNickname()
  }


  handleComment = () => {
    const { comment } = this.state

    const _commentBlog = () => {
      const { nickname } = this.props.contactStore
      this.props.blogStore.comment({ content: comment, nickname })
      this.setState({ comment: '' })
    }

    if (!this.props.contactStore.nickname) {
      checkNickname()
        .then(_commentBlog)
    } else {
      _commentBlog()
    }
  }

  handleChangeComment = e => this.setState({ comment: e.target.value })

  render() {
    const { nickname } = this.props.contactStore
    const blog = this.props.blogStore.currentBlog || {}
    const { comment } = this.state
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
          {/* <div className="blog-author">{blog.author && blog.author.username}</div> */}
          <div className="blog-meta">
            <div className="blog-date">{dateFormater(blog.created)}</div>
          </div>
          <Blog content={blog.content} />
          <div className="blog-comment-input">
            <h2>评论区</h2>
            <InputArea label={`哈咯！${nickname || ''}`} value={comment} onChange={this.handleChangeComment} />
            <Button type={'primary'} onClick={this.handleComment}>评论</Button>
          </div>
          <div className="blog-comment-list">
            {blog.comments && blog.comments.length > 0
              ? blog.comments.map(comment => comment && <Comment key={comment._id} {...comment} />)
              : null
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}
