import React, { useState } from 'react';
import { 
  Modal, Form, Input, Row, Col, Spin, Button,
} from 'antd';
// import axios from 'axios';

function CreateUserForm (props) {
  const [form] = Form.useForm();

  const [loadingData, setLoadingData] = useState(false);

  const handleSubmit = (values, status) => {
    // console.log('Received values of form: ', values);
    // console.log('status', status);

    setLoadingData(true);
    const data = {
      username: values.username,
      email: values.email,
      password: values.password
    }

    if (status === 'create') {
      props.onCreate(data)
    } else {
      props.onUpdate(data)
    }
  };

  const ViewForm = () => {
    return (
      <Form
        form={form}
        layout="vertical"
        hideRequiredMark
      >
        <Row>
          <Col span={24} >
            <Form.Item
              label="Username"
              name="username"
              placeholder="input username"
              rules={[{ required: true, message: 'Please input user name!' }]}
            >
              <Input 
                // onChange={this.handleChange} 
                // disabled={props.status === 'view' ? true : false} 
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              placeholder="input email"
              rules={[{ type: 'email', required: true, message: 'Please input email!' }]}
            >
              <Input 
                // onChange={this.handleChange} 
                // disabled={props.status === 'view' ? true : false} 
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              placeholder="input password"
              rules={[{ required: true, message: 'Please input password!' }]}
            >
              <Input.Password 
                // onChange={this.handleChange} 
                // disabled={props.status === 'view' ? true : false} 
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }

  return (
    <Modal
      key={props.modalKey}
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      confirmLoading={props.loading}
      footer={
        [
          <Button key="back" onClick={props.onCancel}>
            Return
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={props.loading} 
            onClick={() => {
              form.validateFields()
                .then(values => {
                  form.resetFields();
                  handleSubmit(values, props.status);
                })
                .catch(info => {
                  console.log('Validate Failed:', info);
                });
            }}
          >
            Submit
          </Button>,
        ]
      }
    >
      {loadingData ? 
        <div className="f mdl f-ctr">
          <Spin tip="Loading..." /> 
        </div>
      : 
        <ViewForm />
      }
    </Modal>
  )
}

export default CreateUserForm;