import React from 'react'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import { handleAuthSSRForLoginPage } from './../utils/auth.js'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

@inject('AuthSt')
@observer
class login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      remember: true,
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { AuthSt } = this.props

    this.props.form.validateFields((err, values) => {
      if (!err) {
        AuthSt.login(values.username, values.password, this.state.remember)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="container-login-page">
        <div className="wr-login-form">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox
                  value={this.state.remember}
                  onChange={e => {
                    this.setState((prevState, props) => ({
                      remember: !prevState.remember,
                    }))
                  }}
                >
                  Remember me
                </Checkbox>
              )}
              <div className="fl-right">
                Or{' '}
                <Link href="/register">
                  <a> Register now! </a>
                </Link>
              </div>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

login.getInitialProps = async ctx => {
  await handleAuthSSRForLoginPage(ctx)
  return {}
}

const WrappedLogin = Form.create({ name: 'normal_login' })(login)

export default WrappedLogin
