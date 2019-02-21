import React from 'react'
import { Input, Button } from 'dodoui'

export default class Login extends React.Component {
  static getInitialProps() {
    return { footer: false, header: false }
  }

  render() {
    return (
      <div className="login-page">
        <div className="input-form">
          <div className="do-group">
            <Input placeholder="请输入邮箱" />
          </div>
          <div className="do-group">
            <Input placeholder="请输入密码" />
          </div>
          <div className="do-group">
            <Button type="primary" fullWidth={true}>
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
