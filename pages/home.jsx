import React from 'react'
import Link from 'next/link'
import mouseMoveAnimation from 'util/mouse-animation'
import Head from 'next/head'

const links = [
  { to: '/', text: '博客' },
  { to: '/music/list', text: '音乐' },
  // { to: '/contact', text: '留言墙' }
]

export default class App extends React.Component {
  canvasBg = React.createRef()
  static getInitialProps() {
    return { footer: false, header: false }
  }
  componentDidMount() {
    const canvasBg = this.canvasBg.current
    mouseMoveAnimation(canvasBg)
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>小寒的个人网站主页</title>
          <meta name="keywords" content="前端,设计,技术,文章,个人博客,什么都写,边听歌边看博客" />
          <meta name="description" content="超级有趣的网站，学点技术，学点思想，学点设计" />
        </Head>
        <div className="index-page">
          <div className="index-container">
            <div className="index-logo">
              <img src="/static/dodo-logo.png" alt="" />
            </div>

            <div className="index-links">
              {links.map((link, index) => <Link key={index} href={link.to}><a>{link.text}</a></Link>)}
            </div>
          </div>
          <div className="index-canvas-bg" ref={this.canvasBg}></div>
        </div>
      </React.Fragment>
    )
  }
}
