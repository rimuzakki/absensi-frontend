import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  FormOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class AppLayout extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };


  render() {
    return (
      <Layout className="ddsDashboard">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          breakpoint="md"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo">
            {this.state.collapsed ? 'DDS' : 'Data Driven Systems'}
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <DashboardOutlined />
              <span>Dashboard</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <FormOutlined />
                  <span>Master</span>
                </span>
              }
            >
              <Menu.Item key="2">Jabatan</Menu.Item>
              <Menu.Item key="3">Pegawai</Menu.Item>
              <Menu.Item key="4">User</Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
              <FileTextOutlined />
              <span>Laporan absensi</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;