import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import mouseMoveAnimation from 'tools/mouse-animation'
import Router from 'next/router'

const links = [{ to: '/', text: '博客' }, { to: '/music/list', text: '音乐' }]

export default class Home extends React.Component {
  canvasBg = React.createRef()

  static getInitialProps() {
    return { footer: false, header: false }
  }

  componentDidMount() {
    const canvasBg = this.canvasBg.current
    mouseMoveAnimation(canvasBg)
  }

  handleLogOut = () => {
    this.props.userStore.logOut()
    Router.push('/login')
  }

  render() {
    const { info } = this.props.userStore
    return (
      <React.Fragment>
        <Head>
          <title>小寒的个人网站主页</title>
          <meta name="keywords" content="前端,设计,技术,文章,个人博客,什么都写,边听歌边看博客" />
          <meta name="description" content="超级有趣的网站，学点技术，学点思想，学点设计" />
        </Head>
        <div className="home-page">
          <div className="home-container">
            <div className="home-logo">
              <img src="/static/logo.png" alt="" />
            </div>

            <div className="home-links">
              {links.map((link, index) => (
                <Link key={index} href={link.to}>
                  <a className="home-link">{link.text}</a>
                </Link>
              ))}
              {info ? (
                <span className="home-link">
                  <a>{info.username}</a>/<a onClick={this.handleLogOut}>注销</a>
                </span>
              ) : (
                <span className="home-link">
                  <Link href="/login">
                    <a>登录</a>
                  </Link>
                  /
                  <Link href="/sign-up">
                    <a>注册</a>
                  </Link>
                </span>
              )}
            </div>
          </div>
          <div className="home-canvas-bg" ref={this.canvasBg} />
        </div>
      </React.Fragment>
    )
  }
}
