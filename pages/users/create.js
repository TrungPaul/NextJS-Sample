import FormUser from './../../components/FormUser'
import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import { auth } from './../../utils/auth.js'
import CustomLayout from './../../components/CustomLayout'

@inject('UserSt')
@observer
class create extends React.Component {
  render() {
    // eslint-disable-next-line
    const { UserSt, token } = this.props
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
          'Create User',
        ]}
        titlePage="Create User"
      >
        <FormUser formType="create" idItem={''} token={token}></FormUser>
      </CustomLayout>
    )
  }
}

create.getInitialProps = async ctx => {
  let token = (await auth(ctx)) || null
  return { token }
}

export default create
