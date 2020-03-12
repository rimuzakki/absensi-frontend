import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import SideMenu from './Partial/SideMenu';
import FooterApp from './Partial/FooterApp';
import { Routes } from '../Modules/Dashboard/DashboardRoutes';


const { Header, Content } = Layout;

class DashboardLayout extends Component {
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
      <Router>
        <Layout className="ddsDashboard">
          <SideMenu collapsed={this.state.collapsed} />
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
              <Switch>
                {Routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.component />}
                  />
                ))}
              </Switch>
            </Content>
            <FooterApp />
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default DashboardLayout;