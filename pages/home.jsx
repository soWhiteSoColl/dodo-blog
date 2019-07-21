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
      writeOneByOne('嗨', 'h2', container, { interval: 150, sleep: 300 })
        .then(() => writeOneByOne('我是小寒，', 'h4', container, { interval: 150, sleep: 300 }))
        .then(() => writeOneByOne('一名前端开发工程师，也是这个网站的设计者和开发者。', 'p', container, { sleep: 400 }))
        .then(() => writeOneByOne('很开心你能来到了我的小站，或者看看文章，或者听听音乐。', 'p', container, { sleep: 400 }))
        .then(() => writeOneByOne('虽然网站的资源不多，但希望能给你带来一些帮助。', 'p', container, { sleep: 400 }))
        .then(() => writeOneByOne('本站的代码是开源的，可以在github搜索dodo-blog，记得给个star哦。', 'p', container, { sleep: 400 }))
        .then(() => writeOneByOne('另外如果需要联系本人的话，可以通过邮箱1256790127@qq.com或者微信q1256790127。', 'p', container))

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
                  <h2>嗨</h2>
                  <h4>我是小寒，</h4>
                  <p>我是一名前端开发工程师，也是这个网站的设计者和开发者；</p>
                  <p>很开心你能来到了我的小站，或者看看文章，或者听听音乐；</p>
                  <p>虽然网站的资源不多，但希望能给你带来一些帮助。</p>
                  <p>本站的代码是开源的，可以在github搜索dodo-blog，记得给个star哦。</p>
                  <p>另外如果需要联系本人的话，可以通过邮箱1256790127@qq.com或者微信q1256790127。</p>
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
              {info
                ? <span className="home-link">
                  <span>{info.username}</span>
                  <span className="home-link-split">/</span>
                  <a onClick={this.handleLogOut}>注销</a>
                </span>
                : <span className="home-link">
                  <Link href="/login">
                    <a>登录</a>
                  </Link>
                  <span className="home-link-split">/</span>
                  <Link href="/sign-up">
                    <a>注册</a>
                  </Link>
                </span>
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
