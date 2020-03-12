import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  FormOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

class SideMenu extends Component {
  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        breakpoint="md"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo">
          {this.props.collapsed ? 'DDS' : 'Data Driven Systems'}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to='/'>
              <DashboardOutlined />
              <span>Dashboard</span>
            </Link>
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
            <Menu.Item key="2">
              <Link to='/master/pegawai'>
                Jabatan
              </Link>
            </Menu.Item>

            <Menu.Item key="3">
              <Link to='/master/pegawai'>
                Pegawai
              </Link>
            </Menu.Item>

            <Menu.Item key="4">
              <Link to='/master/user'>
                User
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="5">
            <FileTextOutlined />
            <span>Laporan absensi</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SideMenu;