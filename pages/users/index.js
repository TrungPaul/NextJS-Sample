import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import { auth } from './../../utils/auth.js'
import CustomLayout from './../../components/CustomLayout'
import { get2 } from './../../helpers/index.js'
import { Menu, Dropdown, Button, Icon } from 'antd'

@inject('UserSt')
@observer
class index extends React.Component {
  componentDidMount() {
    const { UserSt, token } = this.props
    UserSt.fetchUsersList(token)
  }

  handleDelete = username => {
    const { UserSt, token } = this.props
    let callback = () => {
      UserSt.fetchUsersList(token)
    }

    UserSt.deleteUser(token, username, callback)
  }

  render() {
    // eslint-disable-next-line
    const { UserSt } = this.props
    return (
      <CustomLayout
        activeNavLinkKey="2"
        breadcrumbItems={[
          <Link href="/">
            <a> Home </a>
          </Link>,
          'Users',
        ]}
        titlePage="Users"
      >
        <div className="index-wr">
          <div className="wr-create-btn">
            <Button type="primary" className="create-btn">
              <Link href="/users/create">
                <a> Create </a>
              </Link>
            </Button>
          </div>
          <table className="table custom-table">
            <thead>
              <tr>
                <th scope="col">Fullname</th>
                <th scope="col">Username</th>
                <th scope="col">Active</th>
                <th scope="col">Birthday</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">IP</th>
                <th scope="col">Gender</th>
                <th scope="col">Address</th>
                <th scope="col">City</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {UserSt.users.map((user, index) => {
                const menu = (
                  <Menu>
                    <Menu.Item key="1" className="wr-detail-dropdownitem">
                      <Link href="/users/[id]" as={`/users/${user._id}`}>
                        <a>
                          <Icon className="right1" type="right" />
                          Detail
                        </a>
                      </Link>
                    </Menu.Item>

                    <Menu.Item
                      onClick={this.handleDelete.bind(this, user.userName)}
                      key="2"
                      className="wr-delete-dropdownitem"
                    >
                      <Icon className="delete1" type="delete" />
                      Delete
                    </Menu.Item>
                  </Menu>
                )

                return (
                  <tr key={user._id}>
                    <td>{get2(user, 'fullName')}</td>
                    <td>{get2(user, 'userName')}</td>
                    <td>{get2(user, 'active')}</td>
                    <td>{get2(user, 'birtdday')}</td>
                    <td>{get2(user, 'role')}</td>
                    <td>{get2(user, 'email')}</td>
                    <td>{get2(user, 'phone')}</td>
                    <td>{get2(user, 'ip')}</td>
                    <td>{get2(user, 'gender')}</td>
                    <td>{get2(user, 'address')}</td>
                    <td>{get2(user, 'city')}</td>
                    <td>
                      <Dropdown overlay={menu}>
                        <Button className="btn-action">
                          Action <Icon className="down1" type="down" />
                        </Button>
                      </Dropdown>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CustomLayout>
    )
  }
}

index.getInitialProps = async ctx => {
  let token = (await auth(ctx)) || null
  return { token }
}

export default index
