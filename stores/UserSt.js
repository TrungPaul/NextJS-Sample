import { BasicStore } from './BasicStore'
import _ from 'lodash'
import axios from 'axios'
import { observable, action, computed } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import { getAxios, notify } from './../helpers/index.js'

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

export class UserSt extends BasicStore {
  @observable users = []
  @observable lastName = 'Doe'
  @observable userDetail = {}

  @computed get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  @action fetchUsersList = token => {
    getAxios(token)
      .get('/user')
      .then(resp => {
        console.log('resp.data :', resp.data)
        this.users = resp.data.data
      })
      .catch(err => console.log('err :', _.get(err, 'response.data')))
  }

  @action createUser = (token, requestData, callback) => {
    getAxios(token)
      .post('/user', requestData)
      .then(resp => {
        notify('Create User Success!', 'success')
        if (_.isFunction(callback)) {
          callback()
        }
      })
      .catch(err => console.log('err :', _.get(err, 'response.data')))
  }

  @action updateUser = (token, id, requestData, callback) => {
    getAxios(token)
      .put(`/user/${id}`, requestData)
      .then(resp => {
        notify('Update User Success!', 'success')
        if (_.isFunction(callback)) {
          callback()
        }
      })
      .catch(err => console.log('err :', _.get(err, 'response.data')))
  }

  @action fetchUserById = (token, id) => {
    console.log('fetchUserById')
    getAxios(token)
      .get(`/user/?_id=${id}`)
      .then(resp => {
        this.userDetail = resp.data.data[0]
      })
      .catch(err => {
        console.log('err :', _.get(err, 'response.data'))
      })
  }

  @action deleteUser = (token, username, callback) => {
    getAxios(token)
      .delete(`/user/${username}`)
      .then(resp => {
        notify('Delete user success!', 'success')
        if (_.isFunction(callback)) {
          callback()
        }
      })
      .catch(err => {
        console.log('err :', _.get(err, 'response.data'))
        notify('Delete failed!', 'error')
      })
  }
}

export default new UserSt()
