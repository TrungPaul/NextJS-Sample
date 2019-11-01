import { confirm } from './../helpers/index.js'
import Router from 'next/router'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Select, Checkbox } from '@jbuschke/formik-antd'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'

import React from 'react'
import { inject, observer } from 'mobx-react'
import { formatDate, get2 } from './../helpers/index.js'
import _ from 'lodash'
import CustomLabel from './CustomLabel'
import CustomInput from './CustomInput'

const { Option } = Select

@inject('UserSt')
@observer
class FormUser extends React.Component {
  componentDidMount() {
    console.log('cdu DIDmount', this.props)
    const { UserSt, idItem, token } = this.props
    console.log('idItem :', idItem)
    UserSt.setter('userDetail', {})
    if (!_.isEmpty(idItem)) {
      UserSt.fetchUserById(token, idItem)
    }
    console.log('form user props', this.props)
  }

  componentWillUnmount() {
    const { UserSt } = this.props
    UserSt.setter('userDetail', {})
  }

  render() {
    const { UserSt, formType, idItem, token } = this.props
    if (_.isEmpty(UserSt.userDetail) && formType !== 'create') return null
    return (
      <div
        className={classNames('FormUser-wr wr-form', {
          detailpage: formType === 'details',
        })}
      >
        <Formik
          className="form1"
          initialValues={{
            active: get2(UserSt.userDetail, 'active', true),
            address: get2(UserSt.userDetail, 'address', ''),
            birthday: get2(UserSt.userDetail, 'birthday', ''),
            city: get2(UserSt.userDetail, 'city', ''),
            createdAt: get2(UserSt.userDetail, 'createdAt', ''),
            email: get2(UserSt.userDetail, 'email', ''),
            enterpriseId: get2(UserSt.userDetail, 'enterpriseId', ''),
            fullName: get2(UserSt.userDetail, 'fullName', ''),
            gender: get2(UserSt.userDetail, 'gender', ''),
            ip: get2(UserSt.userDetail, 'ip', ''),
            phone: get2(UserSt.userDetail, 'phone', ''),
            role: get2(UserSt.userDetail, 'role', ''),
            shopManager: get2(UserSt.userDetail, 'shopManager', true),
            userName: get2(UserSt.userDetail, 'userName', ''),
            password: get2(UserSt.userDetail, 'password', ''),
          }}
          onSubmit={(values, { setSubmitting }) => {
            const {
              active,
              address,
              birthday,
              city,
              createdAt,
              email,
              enterpriseId,
              fullName,
              gender,
              ip,
              phone,
              role,
              shopManager,
              userName,
              password,
            } = values
            const requestData = {
              active,
              address,
              birthday,
              city,
              email,
              fullName,
              gender,
              ip,
              phone,
              role,
              shopManager,
            }

            if (formType === 'update') {
              let callback = () => {
                setSubmitting(false)
                Router.push('/users/[id]', `/users/${idItem}`)
              }
              UserSt.updateUser(token, idItem, requestData, callback)
            } else if (formType === 'create') {
              // if user not fill in a field, that field in the requestData will be an empty string.
              // And the server store as null value
              requestData.password = password
              requestData.userName = userName
              let callback = () => {
                setSubmitting(false)
                Router.push('/users')
              }
              UserSt.createUser(token, requestData, callback)
            }
          }}
          onReset={(a, b) => {
            console.log('a :', a)
            console.log('b :', b)
          }}
          validationSchema={Yup.object().shape({})}
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
                <div className="form-left">
                  {/**/}
                  <div className="label-group">Profile</div>
                  {/**/}
                  <div className="onefield">
                    <CustomLabel formType={formType} htmlFor="userName">
                      userName
                    </CustomLabel>
                    <CustomInput
                      disabled={formType === 'update'}
                      formType={formType}
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
                  </div>
                  {/**/}

                  {/**/}
                  {formType === 'create' && (
                    <div className="onefield">
                      <CustomLabel formType={formType} htmlFor="password">
                        password
                      </CustomLabel>
                      <CustomInput
                        formType={formType}
                        autoComplete="off"
                        id="password"
                        type="password"
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
                    </div>
                  )}
                  {/**/}

                  {/**/}
                  <div className="onefield">
                    <CustomLabel formType={formType} htmlFor="fullName">
                      fullName
                    </CustomLabel>
                    <CustomInput
                      formType={formType}
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
                  </div>
                  {/**/}
                  {/**/}
                  <div className="onefield">
                    <CustomLabel htmlFor="gender">gender</CustomLabel>
                    <Select
                      id="gender"
                      value={values.gender}
                      name="gender"
                      className={
                        errors.gender && touched.gender
                          ? 'text-input error'
                          : 'text-input'
                      }
                    >
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                      <Option value="other">other</Option>
                    </Select>

                    {errors.gender && touched.gender && (
                      <div className="input-feedback">{errors.gender}</div>
                    )}
                  </div>
                  {/**/}

                  {/**/}
                  <div className="onefield">
                    <CustomLabel formType={formType} htmlFor="ip">
                      ip
                    </CustomLabel>
                    <CustomInput
                      formType={formType}
                      autoComplete="off"
                      id="ip"
                      type="text"
                      value={values.ip}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.ip && touched.ip
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.ip && touched.ip && (
                      <div className="input-feedback">{errors.ip}</div>
                    )}
                  </div>
                  {/**/}
                  {/**/}
                  <div className="onefield">
                    <CustomLabel formType={formType} htmlFor="address">
                      address
                    </CustomLabel>
                    <CustomInput
                      formType={formType}
                      autoComplete="off"
                      id="address"
                      type="text"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.address && touched.address
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.address && touched.address && (
                      <div className="input-feedback">{errors.address}</div>
                    )}
                  </div>
                  {/**/}
                  {/**/}
                  <div className="onefield">
                    <CustomLabel formType={formType} htmlFor="city">
                      city
                    </CustomLabel>
                    <CustomInput
                      formType={formType}
                      autoComplete="off"
                      id="city"
                      type="text"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.city && touched.city
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.city && touched.city && (
                      <div className="input-feedback">{errors.city}</div>
                    )}
                  </div>
                  {/**/}
                  {/**/}
                  <div className="onefield">
                    <CustomLabel formType={formType} htmlFor="birthday">
                      birthday
                    </CustomLabel>
                    <CustomInput
                      formType={formType}
                      autoComplete="off"
                      id="birthday"
                      type="text"
                      value={values.birthday}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.birthday && touched.birthday
                          ? 'text-input error'
                          : 'text-input'
                      }
                    />
                    {errors.birthday && touched.birthday && (
                      <div className="input-feedback">{errors.birthday}</div>
                    )}
                  </div>
                  {/**/}
                  {/**/}
                  <div className="onefield">
                    <CustomLabel formType={formType} htmlFor="email">
                      email
                    </CustomLabel>
                    <CustomInput
                      formType={formType}
                      autoComplete="off"
                      id="email"
                      type="text"
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
                  </div>
                  {/**/}
                  {/**/}
                  <div className="onefield">
                    <CustomLabel formType={formType} htmlFor="active">
                      active
                    </CustomLabel>
                    <Checkbox
                      disabled={formType === 'details'}
                      id="active"
                      value={values.active}
                      name="active"
                      className={
                        errors.active && touched.active
                          ? 'text-input error'
                          : 'text-input'
                      }
                    ></Checkbox>
                    {errors.active && touched.active && (
                      <div className="input-feedback">{errors.active}</div>
                    )}
                  </div>
                  {/**/}

                  {/**/}
                  <div className="onefield">
                    <CustomLabel formType={formType} htmlFor="role">
                      role
                    </CustomLabel>
                    <Select
                      id="role"
                      value={values.role}
                      name="role"
                      className={
                        errors.role && touched.role
                          ? 'text-input error'
                          : 'text-input'
                      }
                    >
                      <Option value=""> Chọn nhóm quyền</Option>
                      <Option value="user"> User </Option>
                      <Option value="admin"> Admin </Option>
                      <Option value="leader"> Leader </Option>
                    </Select>

                    {errors.role && touched.role && (
                      <div className="input-feedback">{errors.role}</div>
                    )}
                  </div>
                  {/**/}
                  {/**/}
                  <div className="onefield">
                    <CustomLabel formType={formType} htmlFor="phone">
                      phone
                    </CustomLabel>
                    <CustomInput
                      formType={formType}
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
                  </div>
                  {/**/}
                  {/**/}
                  <div className="onefield">
                    <CustomLabel formType={formType} htmlFor="shopManager">
                      shopManager
                    </CustomLabel>
                    <Checkbox
                      disabled={formType === 'details'}
                      id="shopManager"
                      value={values.shopManager}
                      name="shopManager"
                      className={
                        errors.shopManager && touched.shopManager
                          ? 'text-input error'
                          : 'text-input'
                      }
                    ></Checkbox>
                    {errors.shopManager && touched.shopManager && (
                      <div className="input-feedback">{errors.shopManager}</div>
                    )}
                  </div>
                  {/**/}
                  <button
                    type="button"
                    className="outline btn btn-secondary btn-reset1 mr-4"
                    onClick={handleReset}
                    disabled={!dirty || isSubmitting}
                  >
                    Reset
                  </button>
                  {formType === 'update' && (
                    <Link href="/users/[id]" as={`/users/${idItem}`}>
                      <a>
                        <span className="btn btn-info mr-1">Cancel</span>
                      </a>
                    </Link>
                  )}
                  <button
                    type="submit"
                    className="btn btn-success btn-submit1"
                    disabled={isSubmitting}
                  >
                    {formType === 'update' ? 'Confirm Update' : 'Create User'}
                  </button>
                  {formType === 'details' && (
                    <Link href="/users/edit/[id]" as={`/users/edit/${idItem}`}>
                      <a>
                        {' '}
                        <button className="btn btn-primary">Edit</button>{' '}
                      </a>
                    </Link>
                  )}
                  {formType === 'details' && (
                    <span
                      className="btn btn-danger ml-1"
                      onClick={e => {
                        e.preventDefault()
                        const callback = function() {
                          UserSt.deleteUser(token, values.userName, () => {
                            Router.push('/users')
                          })
                        }
                        confirm(`Delete user ${idItem}?`, '', callback)
                      }}
                    >
                      Delete
                    </span>
                  )}
                </div>

                {formType === 'details' && (
                  <div className="form-right">
                    <div className="label-group">Information</div>
                    <div className="onefield">
                      <div className="info-label">Register</div>
                      <div className="info-content">
                        {formatDate(get2(UserSt, 'userDetail.createdAt'))}
                      </div>
                    </div>
                  </div>
                )}
              </form>
            )
          }}
        </Formik>
      </div>
    )
  }
}

FormUser.propTypes = {
  token: PropTypes.any.isRequired,
  idItem: PropTypes.any.isRequired,
  formType: PropTypes.any.isRequired,
}

export default FormUser
