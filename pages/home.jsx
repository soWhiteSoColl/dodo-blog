import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'

export default class Home extends React.Component {
  canvasBg = React.createRef()

  static getInitialProps() {
    return { footer: false, header: false }
  }

  componentDidMount() {}

  handleLogOut = () => {
    this.props.userStore.logOut()
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
            <div className="home-links">
              <Link href="/">
                <a className="home-link">博客</a>
              </Link>
              <Link href="/music/list">
                <a className="home-link">音乐</a>
              </Link>
              {info ? (
                <span className="home-link">
                  <span>{info.username}</span>
                  <span className="home-link-split">/</span>
                  <a onClick={this.handleLogOut}>注销</a>
                </span>
              ) : (
                <span className="home-link">
                  <Link href="/login">
                    <a>登录</a>
                  </Link>
                  <span className="home-link-split">/</span>
                  <Link href="/sign-up">
                    <a>注册</a>
                  </Link>
                </span>
              )}
            </div>
            <div className="home-desc">
              <h2>嗨哟。</h2>
              <h3>
                我是<em>小寒</em>，
              </h3>
              <p>一名前端开发工程师，也是这个网站的创建者和开发者。</p>
              <p>
                在这个网站里你可以愉快的
                <Link href="/">
                  <a>阅读我写的文章</a>
                </Link>
                ，也能
                <Link href="/music/list">
                  <a>听听各种音乐</a>
                </Link>
                。{' '}
              </p>
              <p>
                我相信来到这个网站的大多数人都是开发或者和互联网技术有关的人，如果想要获取源码或者和我有更加亲密的认识，可以通过邮箱
                <em>1256790127@qq.com</em>联系我，也可以加我的微信<em>q1256790127</em>。
              </p>
              <p>非常欢迎各种不速之客来对我的网站进行评价和指点。</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
