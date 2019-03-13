import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'

function writeOneByOne(text, dom, container, opt = {}) {
  const el = document.createElement(dom)
  const bar = document.createElement('span')
  bar.className = 'write-vertical-bar'
  el.appendChild(bar)
  container.appendChild(el)

  let timer = null,
    currentIndex = 0,
    interval = opt.interval || 100,
    sleep = opt.sleep || 0

  return new Promise(resolve => {
    function next() {
      const textNode = document.createTextNode(text[currentIndex])
      el.insertBefore(textNode, bar)

      currentIndex++
      if (currentIndex < text.length) {
        timer = setTimeout(() => {
          next()
        }, interval)
      } else {
        timer = setTimeout(() => {
          el.removeChild(bar)
          clearTimeout(timer)
          resolve()
        }, sleep)
      }
    }

    next()
  })
}

export default class Home extends React.Component {
  $container = React.createRef()

  static getInitialProps() {
    return { footer: false, header: false }
  }

  componentDidMount() {
    const container = this.$container.current

    if (!this.props.configStore.isWriteEnd) {
      writeOneByOne('嗨哟。', 'h2', container, { interval: 150, sleep: 300 })
        .then(() => writeOneByOne('我是小寒，', 'h4', container, { interval: 150, sleep: 300 }))
        .then(() => writeOneByOne('一名前端开发工程师，也是这个网站的创建者和开发者。', 'p', container, { sleep: 400 }))
        .then(() =>
          writeOneByOne('在这个网站里你可以愉快的阅读我写的文章，也能听听各种音乐。', 'p', container, { sleep: 400 })
        )
        .then(() =>
          writeOneByOne(
            '相信大多数的来到这个网站的人都是和互联网技术有关的人，如果想要获取源码或者和我有更加亲密的认识，可以通过邮箱1256790127@qq.com联系我，也可以加我的微信q1256790127。',
            'p',
            container,
            { sleep: 400 }
          )
        )
        .then(() => writeOneByOne('非常欢迎各种不速之客来对我的网站进行评价和指点。', 'p', container))

      const onRouterChange = () => {
        this.props.configStore.isWriteEnd = true
        Router.events.off('routeChangeStart', onRouterChange)
      }
      Router.events.on('routeChangeStart', onRouterChange)
    }
  }

  handleLogOut = () => {
    this.props.userStore.logOut()
  }

  render() {
    const { info } = this.props.userStore
    const { isWriteEnd } = this.props.configStore

    return (
      <React.Fragment>
        <Head>
          <title>小寒的个人网站主页</title>
          <meta name="keywords" content="前端,设计,技术,文章,个人博客,什么都写,边听歌边看博客" />
          <meta name="description" content="超级有趣的网站，学点技术，学点思想，学点设计" />
        </Head>
        <div className="home-page">
          <div className="home-container">
            <div className="home-desc" ref={this.$container}>
              {isWriteEnd && (
                <>
                  <h2>嗨哟。</h2>
                  <h4>我是小寒，</h4>
                  <p>一名前端开发工程师，也是这个网站的创建者和开发者。</p>
                  <p>在这个网站里你可以愉快的阅读我写的文章，也能听听各种音乐。</p>
                  <p>
                    我相信来到这个网站的大多数人都是开发或者和互联网技术有关的人，如果想要获取源码或者和我有更加亲密的认识，可以通过邮箱1256790127@qq.com联系我，也可以加我的微信q1256790127。
                  </p>
                  <p>非常欢迎各种不速之客来对我的网站进行评价和指点。</p>
                </>
              )}
            </div>
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
          </div>
        </div>
      </React.Fragment>
    )
  }
}
