import React from 'react';
import Head from 'next/head'
import CommentGroup from '../../components/CommentGroup'
import { Tabs } from 'dodoui'
import { checkNickname } from 'tools/checker'


const Tab = Tabs.Item
export default class Contact extends React.Component {
  state = {
    currentTab: 0
  }

  componentDidMount() {
    this.props.contactStore.getLeavedMessages()
  }

  handleSubmit = message => {
    const { leaveMessage } = this.props.contactStore

    this.props.contactStore.nickname &&
      leaveMessage(message)
  }

  handleToggleTab = currentTab => {
    this.setState({ currentTab })
  }

  handleInputName = () => {
    checkNickname()
  }

  render() {
    const { currentTab } = this.state
    const { leavedMessages, nickname } = this.props.contactStore
    const greet = nickname
      ? `嗨，${nickname}。。。`
      : <span className="do-link" onClick={this.handleInputName}>你是谁呀？</span>

    return (
      <React.Fragment>
        <Head>
          <title>小寒的博客 - 联系小寒</title>
          <meta name="keywords" content="前端,设计,技术,文章,个人博客,什么都写,边听歌边看博客" />
          <meta name="description" content="超级有趣的网站，学点技术，学点思想，学点设计" />
        </Head>
        <div className="contact-page">
          <div className="do-content-container">
            <Tabs value={currentTab} onChange={this.handleToggleTab}>
              <Tab>留言</Tab>
              <Tab>联系小寒</Tab>
              <Tab>github</Tab>
            </Tabs>
            {currentTab === 0 && <CommentGroup
              title={greet}
              list={leavedMessages.list}
              onSubmit={this.handleSubmit}
            />}
            {
              currentTab === 1 && <div>开发中。。。</div>
            }
            {
              currentTab === 2 && <div>开发中。。。</div>
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}
