import React from 'react'
import { Input, Button } from 'dodoui'
import Link from 'next/link'
import { observer, inject } from 'mobx-react'

const emailReg = /^[\w.-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/

@inject('userStore')
@observer
class Step1 extends React.Component {
  state = {
    email: ''
  }

  handleChange = e => {
    this.setState({ email: e.target.value })
  }

  handleSendCode = () => {
    this.props.userStore.sendCodeToEmail(this.state.email)
    this.props.onNext()
  }

  render() {
    const { email } = this.state
    const emailInValid = email && !emailReg.test(email)
    const buttonDisabled = emailInValid || !email

    return (
      <>
        <div className="do-group">
          <Input label="请输入邮箱" value={email} onChange={this.handleChange} error={emailInValid} />
        </div>
        <div className="do-group">
          <Button type="primary" onClick={this.handleSendCode} fullWidth={true} disabled={buttonDisabled}>
            确定
          </Button>
        </div>
      </>
    )
  }
}

class Step2 extends React.Component {
  handleSignUp = () => {
    this.props.onNext()
  }

  render() {
    return (
      <>
        <div className="do-group">
          <Input placeholder="请输入验证码" />
        </div>
        <div className="do-group">
          <Input placeholder="输入一个三个字的名字" />
        </div>
        <div className="do-group">
          <Input placeholder="输入密码" type="password" />
        </div>
        <div className="do-group">
          <Input placeholder="确认密码" type="password" />
        </div>
        <div className="do-group">
          <Button type="primary" onClick={this.handleSignUp} fullWidth={true}>
            注册
          </Button>
        </div>
      </>
    )
  }
}

class Step3 extends React.Component {
  handleSignUp = () => {
    this.props.onNext()
  }

  render() {
    return (
      <>
        <h2 className="text-center">恭喜吖，注册成功</h2>
        <br />
        <br />
        <Link href="/login">
          <a>
            <Button type="primary" fullWidth={true}>
              去登录
            </Button>
          </a>
        </Link>
        <Link href="/">
          <a>
            <Button fullWidth={true}>返回首页</Button>
          </a>
        </Link>
      </>
    )
  }
}

export default class Sign extends React.Component {
  static getInitialProps() {
    return { header: false, footer: false }
  }

  state = {
    step: 1
  }

  handleNextStep = () => {
    this.setState({ step: ++this.state.step })
  }

  render() {
    const { step } = this.state

    return (
      <div className="sign-up-page">
        <div className="input-form">
          {step === 1 && <Step1 onNext={this.handleNextStep} />}
          {step === 2 && <Step2 onNext={this.handleNextStep} />}
          {step === 3 && <Step3 onNext={this.handleNextStep} />}
        </div>
      </div>
    )
  }
}
