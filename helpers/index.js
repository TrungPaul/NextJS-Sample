import _ from 'lodash'
import { Modal } from 'antd'
import { toast } from 'react-toastify'
import axios from 'axios'
import { urlAPI } from './../configs/index.js'
import moment from 'moment'

export const getAxios = token => {
  if (!token) {
    throw new Error('token does not exist')
  }
  const instance = axios.create({
    baseURL: urlAPI,
  })
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  return instance
}

export const formatDate = dateString => {
  if (_.isEmpty(dateString)) {
    return ''
  }
  return moment(dateString).format('DD/MM/YYYY hh:mm:ss')
}

export const formatNumber = number => {
  if (number === null || number === 'undefined') {
    return 'Empty'
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const notify = (notifyContent, type) => {
  if (_.isEmpty(type)) {
    throw new Error('Provide toast type!!!!')
  }
  toast[type](notifyContent, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
  })
}

export const confirm = (title, content, callback) => {
  Modal.confirm({
    title,
    content,
    onOk: callback,
    onCancel() {},
  })
}

export const get2 = (object, path, defaultValue) => {
  if (_.isNumber(_.get(object, path, defaultValue))) {
    return formatNumber(_.get(object, path, defaultValue))
  }
  // return _.isEmpty(_.get(object, path, defaultValue))
  //   ? ''
  //   : _.get(object, path, defaultValue)
  return _.get(object, path, defaultValue)
}
