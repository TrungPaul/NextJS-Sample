import { ToastContainer } from 'react-toastify'
import App from 'next/app'
import React from 'react'
import TodoSt from './../stores/TodoSt.js'
import UserSt from './../stores/UserSt.js'
import AuthSt from './../stores/AuthSt.js'
import { Provider } from 'mobx-react'
import './../static/styles/main.css'

import { toJS } from 'mobx'

class MyMobxApp extends App {
  state = {
    TodoSt,
    UserSt,
    AuthSt,
  }

  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext)

    return {
      ...appProps,
    }
  }
  componentDidMount() {
    window.store = this.state
    window.toJS = toJS
  }

  render() {
    const { Component, pageProps } = this.props
    const a = this.state.store
    console.log(a)
    return (
      <React.Fragment>
        <Provider {...this.state}>
          <React.Fragment>
            <ToastContainer></ToastContainer>
            <Component {...pageProps} />
          </React.Fragment>
        </Provider>
      </React.Fragment>
    )
  }
}
export default MyMobxApp
