import React from 'react';
import Head from 'next/head'
import CommentGroup from '../components/CommentGroup'
import { Tabs } from 'dodoui'
import { checkNickname } from 'tools/checker'


class About extends React.Component {
  render() {
    return (
      <div className="do-content-container">
        <div className="contact-about">
          <div>想要联系小寒可以发邮件到小寒的邮箱 1256790127@qq.com，对了也可以加我的qq 1256790127</div>
          <div>鼓励小寒或者想要提出问题可以在留言区留言，小寒会及时查看的哦</div>
          <div>对这个网站的开发感兴趣的可以<a target="_new" href="https://github.com/soWhiteSoColl/blog-web">点击这里</a>获取源码，记得点个小星星呀</div>
          <div>
            <p>觉得网站帮助到你或者做的不错，可以扫描下方的二维码给小寒的加个鸡腿</p>
            <div className="contact-about-pay-row">
              <img src="/static/wx-pay.jpg" alt="" />
              <img src="/static/ali-pay.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


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
            <div className="contact-page-tab">
              <Tabs value={currentTab} onChange={this.handleToggleTab}>
                <Tab>关于小寒</Tab>
                <Tab>留言板</Tab>
              </Tabs>
            </div>
          </div>
          {currentTab === 0 && (
            <div className="do-content-container">
              <CommentGroup list={leavedMessages.list} title={greet} onSubmit={this.handleSubmit} />
            </div>
          )}
          {currentTab === 1 && <About />}
        </div>
      </React.Fragment >
    )
  }
}
