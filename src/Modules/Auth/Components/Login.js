import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import cx from 'classnames';

import s from './Login.module.scss';

class Login extends Component {

  // default redirect page
  redirectPage = '/dashboard';

  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      isLoading: false,
      message: {},
      messageError: null,
      errors: {},
      validateStatus: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      window.location.href = this.redirectPage;
    }
  }

  onFinish = (values) => {
    // console.log('Received values of form: ', values);
    this.setState({  messageError: null });
    setTimeout(() => {
      this.setState({ isLoading: true });
    }, 500);
    axios.post('auth/local', {
      identifier: values.identifier,
      password: values.password
    })
    .then(res => {
      this.setState({ isLoading: false, message: {}, validateStatus: 'success' });
      localStorage.setItem('jwtToken', res.data.jwt);
      localStorage.setItem('user', JSON.stringify(res.data.user.role.type));
      setTimeout(() => {
        window.location.href = this.redirectPage
      }, 600);
    })
    .catch(err => {
      setTimeout(() => {
        if (err.response) {
          this.setState({ 
            messageError: err.response.data.message[0].messages[0].message, 
          });
        }
        this.setState({ isLoading: false });
      }, 1000);
    });
  };

  render() {
    const { messageError } = this.state;

    return (
      <Row className={cx('mdl', s.loginSection)}>
        <Col span={8} offset={8}>
          <div className={s.cardLogin}>
            <div className={s.loginTitle}>
              <h3>Log In</h3>
            </div>
            { messageError !== null ? <Alert type="error" message={messageError} showIcon /> : null }
            <Form
              name="normal_login"
              className={s.loginForm}
              layout="vertical"
              size="large"
              hideRequiredMark	
              // initialValues={{
              //   remember: true,
              // }}
              onFinish={this.onFinish}
            >
              <Form.Item
                label="Username"
                name="identifier"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input 
                  className={s.inputLogin} 
                  prefix={<UserOutlined className={s.icon} />} 
                  placeholder="Username" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input.Password
                  className={s.inputLogin}
                  prefix={<LockOutlined className={s.icon} />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className={s.loginFormButton} loading={this.state.isLoading}>
                  Log In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Login;