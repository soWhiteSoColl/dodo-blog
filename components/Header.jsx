import React, { Component } from 'react'
import Link from 'next/link'


class Header extends Component {
  render() {
    return (
      <header className="main-header">
        <div className="do-content-container">
          <div className="logo-brand">
            <Link href="/home">
              <a>
                <img src="/static/logo.png" alt="" />
              </a>
            </Link>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
