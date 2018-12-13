import React from 'react';
import Head from 'next/head'
import { Button, InputArea } from 'dodoui'
import Comment, { CommentList } from 'widgets/Comment'
import checkNickname from 'util/checkNickname'
import AnimateQueue from 'widgets/AnimateQueue'


export default class Contact extends React.Component {
  state = {
    message: '',
  }

  componentDidMount() {
    this.props.contactStore.getLeavedMessages()
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { leaveMessage, nickname } = this.props.contactStore
    const { message } = this.state
    if (!nickname) {
      checkNickname()
    } else {
      if(!message) return false

      this.props.contactStore.nickname && leaveMessage(message)
      this.setState({ message: '' })
      this.forceUpdate()
    }
  }

  handleChangeMessage = message => {
    this.setState({ message })
  }

  render() {
    const { nickname, leavedMessages } = this.props.contactStore
    const { message } = this.state

    return (
      <React.Fragment>
        <Head>
          <title>小寒的博客 - 联系小寒</title>
          <meta name="keywords" content="前端,设计,技术,文章,个人博客,什么都写,边听歌边看博客" />
          <meta name="description" content="超级有趣的网站，学点技术，学点思想，学点设计" />
        </Head>
        <div className="do-content-container">
          <div className="contact-form">
            <div className="do-group">
              <InputArea
                fullWidth
                placeholder="随便说点什么吧..."
                label={`哈咯！${nickname || ''}`}
                onChange={e => this.handleChangeMessage(e.target.value)}
                value={message}
              />
            </div>
            <div className="do-group">
              <Button type="primary" onClick={this.handleSubmit}>留言</Button>
            </div>
          </div>

          <CommentList>
            <AnimateQueue
              animate={true}
              from={{ transform: 'translateX(80px)' }}
              to={{ transform: 'translateX(0px)' }}
              interval={100}
            >
              {leavedMessages.list.map(message => <Comment
                key={message._id}
                nickname={message.nickname}
                content={message.message}
                created={message.created}
              />)}
            </AnimateQueue>
          </CommentList>
        </div>
      </React.Fragment>
    );
  }
}
