import React, { Component } from 'react';
import {
  // BrowserRouter as Router,
  // Switch,
  Route
} from "react-router-dom";
import { Layout, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import SideMenu from './Partial/SideMenu';
import FooterApp from './Partial/FooterApp';
import {confirmLogout} from '../Modules/Auth/Services/AuthService';
// import DashboardRoutes from '../Modules/Dashboard/DashboardRoutes';
import { Scrollbars } from 'react-custom-scrollbars';


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

  RouteWithSubRoutes = (route) => {
    return (
      <Route
        path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.child} />
        )}
      />
    );
  }


  render() {
    const { children } = this.props;
    return (
      // <Router>
        <Layout className="ddsDashboard">
          <SideMenu collapsed={this.state.collapsed} />
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
              })}
              <Button className='logoutBtn' icon={<LogoutOutlined />} onClick={(e) => confirmLogout(e)} />
            </Header>
            <Scrollbars
              autoHide
              style={{ height: '90vh' }}
            >
              <Content
                // className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 12,
                  minHeight: 280,
                }}
              >
                {/* <Switch>
                  {DashboardRoutes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      children={route.component}
                    />
                  ))}
                </Switch> */}
                { children }
              </Content>
            </Scrollbars>
            <FooterApp />
          </Layout>
        </Layout>
      // </Router>
    );
  }
}

export default DashboardLayout;