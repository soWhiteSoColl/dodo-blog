import React, { Component } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import classnames from 'classnames'

const menus = [
  { href: '/', label: '博客' },
  { href: '/more', label: '项目' },
]

@withRouter
class Header extends Component {
  handleLogin = () => {
    this.props.userStore.login().then(data => (window.location.href = data.path))
  }

  render() {
    const current = this.props.router.asPath

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
          <div className="do-pull-right">
            {menus.map(({ href, label, active, hiddenXs, ...rest }, index) => (
              <Link href={href} key={index}>
                <a
                  className={classnames(
                    (active ? active(current) : href === current) && 'active',
                    hiddenXs && 'hidden-xs'
                  )}
                  {...rest}
                >
                  <span className="header-inner-text">{label}</span>
                  <span className="header-inner-bg" />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </header>
    )
  }
}

export default Header
