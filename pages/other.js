import Cookies from 'js-cookie'
import React from 'react'
import Link from 'next/link'
import CustomLayout from './../components/CustomLayout'

export default class Counter extends React.Component {
  render() {
    return (
      <CustomLayout>
        <div>
          <h1>Other Page, token: {Cookies.get('token')} </h1>
          <Link href="/">
            <a> Home </a>
          </Link>
        </div>
      </CustomLayout>
    )
  }
}
