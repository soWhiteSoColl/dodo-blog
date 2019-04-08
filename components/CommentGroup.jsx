import React from 'react'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import Link from 'next/link'
import { Button } from 'dodoui'
import Comment, { CommentList } from 'widgets/Comment'
import AnimateQueue, { Animate } from 'ui/AnimateQueue'
import { inject, observer } from 'mobx-react'
import { Dialog } from 'ui'

const Editor = dynamic(() => import('widgets/Editor'), {
  ssr: false,
  loading: () => <div className="do-fetching-loading editor-loading">加载中...</div>
})

@inject('userStore')
@observer
export default class CommentGroup extends React.Component {
  state = {
    message: null,
    newMessages: [],
    list: this.props.list
  }

  componentDidUpdate(prevProps) {
    if (this.props.list.length && !prevProps.list.length) {
      this.handlePushList()
    } else if (this.props.list.length !== prevProps.list.length) {
      this.handlePushNewMessage()
    }
  }

  handleEditorChange = message => {
    this.setState({ message })
  }

  handlePushNewMessage = () => {
    const newMessage = this.props.list.splice(0, 1)[0]
    const newMessages = this.state.newMessages

    newMessages.splice(0, 0, newMessage)
    this.setState({ newMessages })
  }

  handlePushList = () => {
    const list = this.props.list
    this.setState({ list })
  }

  handleSubmit = () => {
    const { info } = this.props.userStore
    const { message } = this.state
    if (!info) {
      Dialog.open({
        title: '提示',
        content: '登录后才能发起评论～',
        okBtnText: '登录',
        onOk: close => {
          close()
          Router.push('/login')
        }
      })
    } else {
      if (!message) {
        return null
      }
      const messageHTML = message.toHTML()
      const hasMessage = messageHTML.replace(/<.*?>/g, '').trim()
      hasMessage && this.props.onSubmit(messageHTML)
      this.setState({ message: '' })
    }
  }

  formatComments(list) {
    return list.map(item => {
      const comment = { ...item } // 前拷贝
      if (comment.type === 2) {
        let repliedMessage = list.find(item => item.id === item.reply)
        comment.user = { username: `小寒@${repliedMessage.user.username}` }
      }
      return comment
    })
  }

  render() {
    const { message, newMessages, list } = this.state
    const { title, placeholder } = this.props
    const { info } = this.props.userStore

    return (
      <div className="comment-group">
        <div className="comment-head">
          {info ? (
            <h2>嗨, {info.username}</h2>
          ) : (
            <h2>
              嗨，请先
              <Link href="/login">
                <a>登录</a>
              </Link>
            </h2>
          )}
        </div>
        <div className="comment-form">
          {title && <h2 className="comment-form-title">{title}</h2>}
          <div className="comment-form-wrapper">
            <Editor placeholder={placeholder || '啦啦啦。。。'} value={message} onChange={this.handleEditorChange} />
            <div className="comment-form-submit">
              <span className="comment-form-submit-info">{'(๑>ω<๑) 又是元气满满的一天哟'}</span>
              <Button type="primary" onClick={this.handleSubmit}>
                留言
              </Button>
            </div>
          </div>
        </div>

        <CommentList>
          {this.formatComments(newMessages).map(message => {
            return (
              <Animate
                animate={true}
                from={{ transform: 'translateX(80px)' }}
                to={{ transform: 'translateX(0px)' }}
                key={message._id}
                speed={400}
              >
                <Comment
                  key={message._id}
                  username={message.user.username}
                  content={message.message}
                  created={message.created}
                  type={message.type}
                />
              </Animate>
            )
          })}
          <AnimateQueue
            animate={true}
            from={{ transform: 'translateX(80px)' }}
            to={{ transform: 'translateX(0px)' }}
            interval={100}
          >
            {this.formatComments(list).map(message => (
              <Comment
                key={message._id}
                username={message.user && message.user.username}
                content={message.message}
                created={message.created}
                type={message.type}
              />
            ))}
          </AnimateQueue>
        </CommentList>
      </div>
    )
  }
}
