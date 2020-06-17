import React, { Component } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;


class FooterApp extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center', padding: '10px 50px' }}>Copyright ©2020 Data Driven Systems</Footer>
    );
  }
}

export default FooterApp;