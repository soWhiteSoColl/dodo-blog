import React from 'react';
import withLayout from '../components/Layout'
import Head from 'next/head'
import { Button, InputArea } from 'dodoui'
import Comment, { CommentList } from '../components/widgets/Comment'
import checkNickname from '../util/checkNickname'
@withLayout
export default class Contact extends React.Component {
  state = {
    message: '',
  }

  componentDidMount() {
    this.props.contactStore.getNickname()
    this.props.contactStore.getLeavedMessages()
  }

  
  handleSubmit = e => {
    e.preventDefault();
    const { nickname, leaveMessage } = this.props.contactStore
    const { message } = this.state
    if (!nickname) {
      checkNickname()
        .then(() => {
          this.props.contactStore.nickname && leaveMessage(message)
          this.setState({ message: '' })
        })
    } else {
      leaveMessage(message)
      this.setState({ message: '' })
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

          <CommentList>
            {leavedMessages.list.map(message => <Comment key={message._id} nickname={message.nickname} content={message.message} />)}
          </CommentList>
        </div>
      </React.Fragment>
    );
  }
}
