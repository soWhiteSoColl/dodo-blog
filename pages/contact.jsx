import React from 'react';
import withLayout from '../components/Layout'
import Head from 'next/head'
import { Button, Dialog, Input, InputArea } from 'dodoui'
import { dateFormater } from '../util/tool'


const LeavedMessage = props => {
  const message = props.message.replace('<', '\&lt;').replace('\n', '<br/>').replace(' ', '&nbsp;')

  return (
    <div className="contact-message-item">
      <div className="contact-message-head">
        <span className="contact-message-nickname">{props.nickname}</span>
      </div>
      <div className="contact-message-content">
        <span className="contact-message-create-time">{dateFormater(props.created)}</span>
        <div dangerouslySetInnerHTML={{ __html: message }}></div>
      </div>
    </div>
  )
}
@withLayout
export default class Contact extends React.Component {
  state = {
    message: '',
  }

  componentDidMount() {
    this.props.contactStore.getNickname()
    this.props.contactStore.getLeavedMessages()
    if (!this.props.contactStore.nickname) {
      this.handleGetNickname()
    }
  }

  handleGetNickname = () => {
    return new Promise((resolve) => {
      let userInput = ''
      Dialog.open({
        title: '提示',
        content: (
          <div className="">
            <Input
              width={400}
              label="请先告诉我你的名字（昵称）"
              onChange={e => userInput = e.target.value}
            />
          </div>
        ),
        onOk: (_, close) => {
          this.props.contactStore.saveNickname(userInput)
          close()
          resolve()
        },
      })
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { nickname, leaveMessage } = this.props.contactStore
    const { message } = this.state
    if (!nickname) {
      this.handleGetNickname()
        .then(() => this.props.contactStore.nickname && leaveMessage(message))
    } else {
      leaveMessage(message)
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
          <title>dodo 留言</title>
        </Head>
        <div className="do-common-container">
          <div className="contact-form">
            <div className="do-group">
              <InputArea
                rows={10}
                fullWidth
                placeholder="在这里留言..."
                label={`哈咯！${nickname || ''}`}
                onChange={e => this.handleChangeMessage(e.target.value)}
                value={message}
              />
            </div>
            <div className="do-group">
              <Button disabled={!message} type="primary" onClick={this.handleSubmit}>留言</Button>
            </div>
          </div>

          <div className="contact-message-list">
            {leavedMessages.list.map(message => <LeavedMessage key={message._id} {...message} />)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
