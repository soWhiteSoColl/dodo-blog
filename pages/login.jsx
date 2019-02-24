import React from 'react'
import { Input, Button } from 'dodoui'
import Router from 'next/router'

export default class Login extends React.Component {
  static getInitialProps() {
    return { footer: false, header: false }
  }

  state = {
    user: {}
  }

  handleLogin = async () => {
    await this.props.userStore.login(this.state.user)
    Router.push('/')
  }

  handleInputChange = (attr, value) => {
    const { user } = this.state
    user[attr] = value
    this.setState({ user })
  }

  render() {
    return (
      <div className="login-page">
        <div className="input-form">
          <div className="do-group">
            <Input
              name="dodo-login-email"
              placeholder="请输入邮箱"
              onChange={e => this.handleInputChange('email', e.target.value)}
            />
          </div>
          <div className="do-group">
            <Input
              name="dodo-login-password"
              placeholder="请输入密码"
              type="password"
              onChange={e => this.handleInputChange('password', e.target.value)}
            />
          </div>
          <div className="do-group">
            <Button type="primary" fullWidth={true} onClick={this.handleLogin}>
              登录
            </Button>
          </div>
          <div className="do-group text-center">
            <a className="text-link" href="/sign-up">
              还没账号，注册一个
            </a>
          </div>
        </div>
      </div>
    )
  }
}
