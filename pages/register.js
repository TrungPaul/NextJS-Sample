import { Formik } from 'formik'
import * as Yup from 'yup'
import React from 'react'

import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import { handleAuthSSRForLoginPage } from './../utils/auth.js'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd'

const { Option } = Select
const AutoCompleteOption = AutoComplete.Option

var sampleFormRegister = {
  active: true,
  email: 'tuananh92.ftu@gmail.com',
  enterpriseName: 'my shop',
  fullName: 'do tuan anh',
  password: 'nolanhom@',
  phone: '0999222333',
  role: 'admin',
  shopManager: true,
  userName: 'coder054',
}

@inject('AuthSt')
@observer
class register extends React.Component {
  render() {
    const { AuthSt } = this.props
    return (
      <div className="wr-page-register">
        <div className="wr-form-register wr-form">
          <Formik
            initialValues={{
              email: '',
              enterpriseName: '',
              fullName: '',
              password: '',
              phone: '',
              userName: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              AuthSt.register(values, () => {
                setSubmitting(false)
              })
            }}
            validationSchema={Yup.object().shape({
              userName: Yup.string().required('Required'),
            })}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
              } = props
              return (
                <form onSubmit={handleSubmit}>
                  <div className="login-wrap-input">
                    <i className="fas fa-shopping-cart"></i>
                    {/**/}
                    <input
                      placeholder="Tên Shop của Quý khách"
                      autoComplete="off"
                      id="enterpriseName"
                      type="text"
                      value={values.enterpriseName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.enterpriseName && touched.enterpriseName
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.enterpriseName && touched.enterpriseName && (
                      <div className="input-feedback">
                        {errors.enterpriseName}
                      </div>
                    )}
                    {/**/}
                  </div>
                  <div className="login-wrap-input">
                    <i className="far fa-user"></i>
                    {/**/}
                    <input
                      placeholder="Họ và Tên của Quý khách"
                      autoComplete="off"
                      id="fullName"
                      type="text"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.fullName && touched.fullName
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.fullName && touched.fullName && (
                      <div className="input-feedback">{errors.fullName}</div>
                    )}
                    {/**/}
                  </div>
                  <div className="login-wrap-input">
                    <i className="fa fa-user"></i>
                    {/**/}
                    <input
                      placeholder="Tài khoản đăng nhập"
                      autoComplete="off"
                      id="userName"
                      type="text"
                      value={values.userName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.userName && touched.userName
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.userName && touched.userName && (
                      <div className="input-feedback">{errors.userName}</div>
                    )}
                    {/**/}
                  </div>
                  <div className="login-wrap-input">
                    <i className="fa fa-lock"></i>
                    {/**/}
                    <input
                      placeholder="Mật khẩu"
                      autoComplete="off"
                      id="password"
                      type="text"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                    {/**/}
                  </div>
                  <div className="login-wrap-input">
                    <i className="fas fa-envelope"></i>
                    {/**/}
                    <input
                      placeholder="Email"
                      autoComplete="off"
                      id="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                    {/**/}
                  </div>
                  <div className="login-wrap-input">
                    <i className="fas fa-mobile"></i>
                    {/**/}
                    <input
                      placeholder="Điện thoại"
                      autoComplete="off"
                      id="phone"
                      type="text"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.phone && touched.phone
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.phone && touched.phone && (
                      <div className="input-feedback">{errors.phone}</div>
                    )}
                    {/**/}
                  </div>

                  <button
                    className="btn btn-primary btn-submit1"
                    type="submit"
                    disabled={isSubmitting}
                    style={{ width: '100%' }}
                  >
                    Đăng ký
                  </button>
                  <div className="wr-dangnhapngay">
                    Đã có tài khoản{' '}
                    <Link href="/login">
                      <a> đăng nhập ngay </a>
                    </Link>
                  </div>
                </form>
              )
            }}
          </Formik>
        </div>
      </div>
    )
  }
}

register.getInitialProps = async ctx => {
  await handleAuthSSRForLoginPage(ctx)
  return {}
}

export default register
