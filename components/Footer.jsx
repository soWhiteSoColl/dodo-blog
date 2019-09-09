import React, { Component } from 'react'
import Link from 'next/link'


class Footer extends Component {
  render() {
    return (
      <footer className="main-footer">
        <div className="do-content-container">
          <div>
            <div className="main-footer-links">
              github  <a target="_new" href="https://github.com/soWhiteSoColl">
                soWhiteSoColl
              </a>
            </div>

            <div>
              <span className="main-footer-item">&copy;2018 dodo</span>
              <span className="main-footer-item">
                <Link href="/blog?id=5c2c8bf7e71e1855ab4d18f0">
                  <a>关于小寒</a>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
