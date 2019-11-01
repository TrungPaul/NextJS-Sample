import FormUser from './../../../components/FormUser'
import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import { auth } from './../../../utils/auth.js'
import CustomLayout from './../../../components/CustomLayout'

@inject('UserSt')
@observer
class edit extends React.Component {
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

          'User Edit',
        ]}
        titlePage="User Edit"
      >
        <FormUser formType="update" idItem={id} token={token}></FormUser>
      </CustomLayout>
    )
  }
}

edit.getInitialProps = async ctx => {
  let token = (await auth(ctx)) || null
  return { id: ctx.query.id, token }
}

export default edit
