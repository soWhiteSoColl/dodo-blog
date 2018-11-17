import React, { Component } from 'react'
import { Dialog } from 'dodoui';

const friendLinks = [
  { name: '鼻子亲了脸', url: 'https://www.bzqll.com/' },
  { name: '欧吉祥博客', url: 'https://oujixiang.com' },
  { name: '小伟博客', url: 'http://www.mlwei.com' },
]
class Footer extends Component {
  // handleShowQrcode = () => {
  //     Dialog.open({
  //         title: '加微信',
  //         content: <img className="main-footer-wx-qrcode" src="/static/qrcode.jpg" alt=""/>,
  //         animationIn: 'bounce',
  //     })
  // }
  render() {
    return (
      <footer className="main-footer">
        <div className="do-common-container">
          {/* <span className="main-footer-item"><span className="do-link" onClick={this.handleShowQrcode}>@微信 小寒</span></span> */}
          <div>
          <span className="main-footer-item"><a target="_new" href="https://github.com/soWhiteSoColl">@github soWhiteSoColl</a></span>
          <span className="main-footer-item">&copy;2018 dodo</span>
          </div>

          <div className="main-footer-links">
            <span>友情链接</span> {friendLinks.map((link, index) => <a key={index} href={link.url} target="_new">{link.name}</a>)}
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer
