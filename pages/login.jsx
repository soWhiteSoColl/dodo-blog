import React, { Component } from 'react'
import Router from 'next/router'
import withLayout from '../components/Layout'

class Page extends Component {
  handleLogin = () => {
    Router.push('/')
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-form">
          <img className="login-brand" src="/static/dodo-logo.png" alt="" />
          <div className="form-group">
            <input type="text" className="login-input" />
          </div>
          <div className="form-group">
            <input type="password" className="login-input" />
          </div>
          <button className="login-button" onClick={this.handleLogin}>登录</button>
        </div>
      </div>
    );
  }
}

export default withLayout(Page, { header: false, footer: false })
