import PropTypes from 'prop-types'
import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import { Layout, Menu, Breadcrumb, Dropdown, Icon } from 'antd'

const { Header, Content, Footer } = Layout

@inject('AuthSt')
@observer
class LogoutText extends React.Component {
  render() {
    // eslint-disable-next-line
    const { AuthSt } = this.props
    return (
      <a
        onClick={e => {
          e.preventDefault()
          AuthSt.logout()
        }}
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        Log Out
      </a>
    )
  }
}

const menu = (
  <Menu>
    <Menu.Item>
      <LogoutText></LogoutText>
    </Menu.Item>
  </Menu>
)

@inject('AuthSt')
@observer
class CustomLayout extends React.Component {
  render() {
    // eslint-disable-next-line
    const {
      AuthSt,
      children,
      activeNavLinkKey,
      breadcrumbItems,
      titlePage,
    } = this.props
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[activeNavLinkKey]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link href="/">
                <a> Todo </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link href="/users">
                <a> Users </a>
              </Link>
            </Menu.Item>

            <Menu.Item key="4" className="wr-avatar">
              <Dropdown overlay={menu}>
                <i className="fas fa-user-circle avatar"></i>
              </Dropdown>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbItems.map((item, index) => (
              <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            className="wr-main-content"
            style={{ background: '#fff', padding: 24 }}
          >
            <h1 className="titlePage">{titlePage}</h1>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Vmodev ©2019 Created by Vmodev
        </Footer>
      </Layout>
    )
  }
}

CustomLayout.propTypes = {
  children: PropTypes.any.isRequired,
  activeNavLinkKey: PropTypes.string.isRequired,
  titlePage: PropTypes.string.isRequired,
  breadcrumbItems: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default CustomLayout
