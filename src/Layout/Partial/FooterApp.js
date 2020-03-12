import React, { Component } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;


class FooterApp extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>Copyright ©2020 Data Driven Systems</Footer>
    );
  }
}

export default FooterApp;