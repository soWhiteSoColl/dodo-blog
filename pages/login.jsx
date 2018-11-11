import React, { Component } from 'react'
import Router from 'next/router'

class Page extends Component {
  static getInitialProps() {
    return { footer: false, header: false, audio: false }
  }

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
