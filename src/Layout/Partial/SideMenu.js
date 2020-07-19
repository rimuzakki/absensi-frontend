import React, { Component } from 'react';
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link
} from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  FormOutlined,
  FileTextOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';


const { Sider } = Layout;
const { SubMenu } = Menu;

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenuKey: '',
      openedMenuKey: '',
    }
  }

  render() {
    let selectedMenuKey = '';
    let openedMenuKey = 'sub1';
    if (this.props.breadcrumb === 'Dashboard') {
      selectedMenuKey = '1'
    } else if (this.props.breadcrumb === 'Divisions') {
      openedMenuKey = 'sub1'
      selectedMenuKey = '2'
    } else if (this.props.breadcrumb === 'Employees') {
      openedMenuKey = 'sub1'
      selectedMenuKey = '3'
    } else if (this.props.breadcrumb === 'Users') {
      openedMenuKey = 'sub1'
      selectedMenuKey = '4'
    } else if (this.props.breadcrumb === 'Report') {
      selectedMenuKey = '5'
    } else if (this.props.breadcrumb === 'Absensi') {
      selectedMenuKey = '6'
    }

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        breakpoint="md"
        onBreakpoint={broken => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo">
          {this.props.collapsed ? 'DDS' : 'Data Driven Systems'}
        </div>
        <Menu 
          theme="dark" 
          mode="inline" 
          // defaultSelectedKeys={['1']}
          selectedKeys={[selectedMenuKey]}  
          defaultOpenKeys={[openedMenuKey]}
        >
          <Menu.Item key="1">
            <Link to='/dashboard'>
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
              <Link to='/dashboard/master/jabatan'>
                Divisions
              </Link>
            </Menu.Item>

            <Menu.Item key="3">
              <Link to='/dashboard/master/pegawai'>
                Employees
              </Link>
            </Menu.Item>

            <Menu.Item key="4">
              <Link to='/dashboard/master/user'>
                Users
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="5">
            <Link to='/dashboard/report'>
              <FileTextOutlined />
              <span>Presence report</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to='/absensi'>
              <QrcodeOutlined />
              <span>Presence</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    breadcrumb: state.breadcrumb,
  }
}

export default connect(mapStateToProps)(SideMenu);