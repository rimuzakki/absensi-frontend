import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import cx from 'classnames';

import s from './Login.module.scss';

class Login extends Component {

  onFinish = values => {
    console.log('Received values of form: ', values);
  };

  render() {
    return (
      <Row className={cx('mdl', s.loginSection)}>
        <Col span={8} offset={8}>
          <div className={s.cardLogin}>
            <div className={s.loginTitle}>
              <h3>Log In</h3>
            </div>
            <Form
            name="normal_login"
            className={s.loginForm}
            layout="vertical"
            size="large"
            hideRequiredMark	
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish()}
            >
              <Form.Item
                label="Username"
                name="username"
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
                <Button type="primary" htmlType="submit" className={s.loginFormButton}>
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