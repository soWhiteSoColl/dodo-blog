import React from 'react'
import { Input, Button } from 'dodoui'
import Link from 'next/link'
import { observer, inject } from 'mobx-react'
import { Message, Spin } from 'ui'

const emailReg = /^[\w.-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/

@inject('userStore')
@observer
class Step1 extends React.Component {
  state = {
    email: '',
    spinning: false
  }

  handleChange = e => {
    this.setState({ email: e.target.value })
  }

  handleSendCode = async () => {
    const { email } = this.state
    this.setState({ spinning: true })
    await this.props.userStore.checkEmailAndSendCode(email)
    this.props.userStore.setValue({ currentUserEmail: email })
    Message.success('一个验证码已经发送到您的邮箱啦，请用该验证码完成注册')
    this.setState({ spinning: false })
    this.props.onNext()
  }

  render() {
    const { email, spinning } = this.state
    const emailInValid = email && !emailReg.test(email)
    const buttonDisabled = emailInValid || !email

    return (
      <Spin spinning={spinning}>
        <div className="do-group">
          <Input label="请输入邮箱" value={email} onChange={this.handleChange} error={emailInValid} />
        </div>
        <div className="do-group">
          <Button type="primary" onClick={this.handleSendCode} fullWidth={true} disabled={buttonDisabled}>
            确定
          </Button>
        </div>
      </Spin>
    )
  }
}

@inject('userStore')
@observer
class Step2 extends React.Component {
  state = {
    user: { email: this.props.userStore.currentUserEmail }
  }

  handleInputChange = (attr, value) => {
    const { user } = this.state
    user[attr] = value
    this.setState({ user })
  }

  handleSignUp = async () => {
    await this.props.userStore.signUp(this.state.user)
    this.props.onNext()
  }

  render() {
    return (
      <>
        <div className="do-group">
          <Input
            placeholder="请输入验证码"
            type="number"
            onChange={e => this.handleInputChange('code', e.target.value)}
          />
        </div>
        <div className="do-group">
          <Input
            name="dodo-sign-username"
            placeholder="输入一个三个字的名字"
            maxLength={3}
            onChange={e => this.handleInputChange('username', e.target.value)}
          />
        </div>
        <div className="do-group">
          <Input
            name="dodo-sign-password"
            placeholder="输入8-16位的数字和字母组成的密码"
            type="password"
            onChange={e => this.handleInputChange('password', e.target.value)}
          />
        </div>
        <div className="do-group">
          <Input
            name="dodo-sign-confirm-password"
            placeholder="确认密码"
            type="password"
            onChange={e => this.handleInputChange('confirmPassword', e.target.value)}
          />
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
