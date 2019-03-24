import React, { Component } from 'react'
import Link from 'next/link'

const friendLinks = [
  { name: '鼻子亲了脸', url: 'https://www.bzqll.com/' },
  { name: '小伟博客', url: 'http://www.mlwei.com' },
  { name: 'justdodo的博客', url: 'https://www.justdodo.cn' },
  { name: 'Ronaldo', url: 'http://www.cronaldo7.cn/' },
  { name: '组件库', url: 'https://ui.dodoblog.cn' }
]
class Footer extends Component {
  render() {
    return (
      <footer className="main-footer">
        <div className="do-content-container">
          <div>
            <div className="main-footer-links">
              <span>友情链接</span>{' '}
              {friendLinks.map((link, index) => (
                <a key={index} href={link.url} target="_new">
                  {link.name}
                </a>
              ))}
              <a target="_new" href="https://github.com/soWhiteSoColl">
                soWhiteSoColl
              </a>
            </div>

            <div>
              <span className="main-footer-item">&copy;2018 dodo</span>
              <span className="main-footer-item">
                <Link href="/blog?id=5c2c8bf7e71e1855ab4d18f0">关于小寒</Link>
              </span>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
