import React, { useState, useEffect } from 'react';
import { 
  Modal, Form, Input, Row, Col, notification, Spin, Button, 
  Switch, Select
  // Select
} from 'antd';
// import moment from 'moment';
import axios from 'axios';

const { Option } = Select;

function UserForm(props) {
  const [loadingData, setLoadingData] = useState(false);
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [role, setRole] = useState('');



  const [form] = Form.useForm();

  useEffect(() => {
    const fetchDivision = async () => {
      setLoadingData(true);

      try {
        const response = await axios.get(`users/${props.data}`);
        // setData(response.data);
        setLoadingData(false);
        setFullname(response.data.fullname);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setConfirmed(response.data.confirmed);
        setBlocked(response.data.blocked);
        setRole(response.data.role.id);

      } catch (error) {
        notification.error({
          message: 'Error',
          description: error.response,
          isLoadingData: false,
        });
        setLoadingData(false);
      }
    }
      if (props.data) {
        fetchDivision();
      }
  }, [props.data]);

  const handleSubmit = (values, status) => {
    // console.log('Received values of form: ', values);
    // console.log('status', status);

    // setLoadingData(true);
    const data = {
      fullname: values.fullname,
      username: values.username,
      email: values.email,
      confirmed: values.confirmed,
      blocked: values.blocked,
      role: {
        id: values.role,
      }
    }

    if (status === 'create') {
      props.onCreate(data)
    } else {
      props.onUpdate(data)
    }
  };


  const ViewForm = () => {
    // const [form] = Form.useForm();
    if (props.status === 'view' || props.status === 'edit') {
      form.setFieldsValue({
        fullname,
        username,
        email,
        // confirmed,
        // blocked,
        role,
      })
    }
    
    return (
      <Form
        form={form}
        layout="vertical"
        hideRequiredMark
      >
        <Row>
          <Col span={24} >
            <Form.Item
              label="Fullname"
              name="fullname"
              rules={[{ required: true, message: 'Please input full name!' }]}
            >
              <Input 
                // onChange={this.handleChange} 
                disabled={props.status === 'view' ? true : false} 
              />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input username!' }]}
            >
              <Input 
                // onChange={this.handleChange} 
                disabled={props.status === 'view' ? true : false} 
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ type: 'email', required: true, message: 'Please input email!' }]}
            >
              <Input 
                // onChange={this.handleChange} 
                disabled={props.status === 'view' ? true : false} 
              />
            </Form.Item>

            <Form.Item 
              label="Role" 
              name="role" 
              rules={[{ required: true, message: 'Please input role!' }]}>

              <Select
                // defaultValue={role}
                placeholder="Select a role"
                // onChange={onGenderChange}
              >
                <Option key="1" value={1}>Authenticated</Option>
                <Option key="2" value={2}>Public</Option>
              </Select>
            </Form.Item>

            <Form.Item 
              label="Confirmed"
              name="confirmed"  
            >
              <Switch
                checked={confirmed}
                checkedChildren="True" unCheckedChildren="False"
                disabled={props.status === 'view' ? true : false}  
              />
            </Form.Item>

            <Form.Item 
              label="Blocked"
              name="blocked"  
            >
              <Switch
                checked={blocked} 
                checkedChildren="True" unCheckedChildren="False"
                disabled={props.status === 'view' ? true : false}  
              />
            </Form.Item>

          </Col>
        </Row>
        

      </Form>
    )
  }

  const ViewModal = () => {
    // const [form] = Form.useForm();
    return (
      <Modal
        key={props.modalKey}
        title={props.title}
        visible={props.visible}
        onCancel={props.onCancel}
        confirmLoading={props.loading}
        footer={
          props.status === 'view' ?
          [
            <Button key="back" onClick={props.onCancel}>
              Close
            </Button>
          ]
          : 
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

  return (
    <ViewModal />
  )
}

export default UserForm;