import React, { Component } from 'react'
import { dateFormater } from 'tools'
import Head from 'next/head'
import { Button } from 'dodoui'
import Comment, { CommentList } from 'widgets/Comment'
import AnimateQueue, { Animate } from 'widgets/AnimateQueue'
import checkNickname from 'util/checkNickname'
import Blog from 'widgets/Blog'
import dynamic from 'next/dynamic'
import { toJS } from 'mobx'
const Editor = dynamic(() => import('widgets/Editor'), { ssr: false })


export default class BlogDetail extends Component {
  static async getInitialProps(ctx, store) {
    let id = ctx.query && ctx.query.id
    let blog = await store.blogStore.read(id)
    return { id, blog }
  }

  state = {
    newComments: [],
    message: null
  }

  componentDidMount() {
    console.log(this.props.blog)
    this.props.blogStore.setValue('currentBlog', this.props.blog)
  }

  handleEditorChange = message => {
    this.setState({ message })
  }

  handleComment = () => {
    const { message } = this.state

    const _commentBlog = () => {
      const { nickname } = this.props.contactStore
      this.props.blogStore.comment({ message: message.toHTML(), nickname })
        .then(comment => this.setState({ newComments: this.state.newComments.concat([comment]) }))
      this.setState({ message: null })
    }

    if (!this.props.contactStore.nickname) {
      checkNickname()
        .then(_commentBlog)
    } else {
      _commentBlog()
    }
  }

  render() {
    const blog = this.props.blog || {}
    const { message, newComments } = this.state
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
          <Blog content={blog.content} />
          <div className="blog-comment-input">
            <h2>评论区</h2>
            <Editor
              placeholder={'啦啦啦。。。'}
              value={message}
              onChange={this.handleEditorChange}
            />
            <Button type={'primary'} onClick={this.handleComment}>评论</Button>
          </div>
          <CommentList>
            {
              newComments.map(message => {
                return <Animate
                  animate={true}
                  from={{ transform: 'translateX(80px)' }}
                  to={{ transform: 'translateX(0px)' }}
                  key={message._id}
                  speed={400}
                >
                  <Comment
                    key={message._id}
                    nickname={message.nickname}
                    content={message.message}
                    created={message.created}
                  />
                </Animate>
              })
            }
            <AnimateQueue
              animate={true}
              from={{ transform: 'translateX(80px)' }}
              to={{ transform: 'translateX(0px)' }}
              interval={100}
            >
              {blog.comments && blog.comments.map(message => <Comment
                key={message._id}
                nickname={message.nickname}
                content={message.message}
                created={message.created}
              />)}
            </AnimateQueue>
          </CommentList>
        </div>
      </React.Fragment>
    )
  }
}
