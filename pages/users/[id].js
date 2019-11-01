import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import { auth } from './../../utils/auth.js'
import FormUser from './../../components/FormUser'
import CustomLayout from './../../components/CustomLayout'

@inject('UserSt')
@observer
class detail extends React.Component {
  render() {
    // eslint-disable-next-line
    const { UserSt, id, token } = this.props
    return (
      <CustomLayout
        activeNavLinkKey="2"
        breadcrumbItems={[
          <Link href="/">
            <a> Home </a>
          </Link>,

          <Link href="/users">
            <a> Users </a>
          </Link>,

          'User Detail',
        ]}
        titlePage="User Detail"
      >
        <FormUser formType="details" idItem={id} token={token}></FormUser>
      </CustomLayout>
    )
  }
}

detail.getInitialProps = async ctx => {
  let token = (await auth(ctx)) || null
  return { id: ctx.query.id, token }
}

export default detail
