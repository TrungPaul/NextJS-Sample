import _ from 'lodash'
import { BasicStore } from './BasicStore'
import Cookies from 'js-cookie'
import axios from 'axios'
import { observable, action, computed, autorun } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import { notify, getAxios } from './../helpers/index.js'
import { urlAPI } from './../configs/index.js'

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

export class AuthSt extends BasicStore {
  @observable token = ''

  @action login = (userName, password, remember) => {
    axios
      .post(`${urlAPI}/user/login`, {
        userName,
        password,
      })
      .then(resp => {
        console.log('resp.data :', resp.data)

        const cookieConfig = { path: '/' }
        if (remember === true) {
          cookieConfig.expires = 36500
        }
        Cookies.set('token', resp.data.token, cookieConfig)
        notify('Login success!', 'success')
        window.location = '/'
      })
      .catch(err => {
        notify(err.response.data.err, 'error')
      })
  }

  @action logout = () => {
    Cookies.remove('token', { path: '/' })
    window.location = '/login'
  }

  @action register = (data, callback) => {
    data.active = true
    data.role = 'admin'
    data.shopManager = true
    axios
      .post(`${urlAPI}/user/register`, data)
      .then(resp => {
        console.log('resp.data :', resp.data)
        notify('Register success!', 'success')
        if (_.isFunction(callback)) {
          callback()
        }
        setTimeout(() => {
          window.location = '/login'
        }, 1000)
      })
      .catch(err => {
        console.log('err :', err.response.data)
        notify(_.get(err, 'response.data.err'), 'error')
      })
  }
}

export default new AuthSt()
