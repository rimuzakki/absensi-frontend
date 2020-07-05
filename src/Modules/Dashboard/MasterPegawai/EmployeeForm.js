import React, { useState, useEffect } from 'react';
import { 
  Modal, Form, Input, Row, Col, Select, notification, Spin, Button, 
  TimePicker
} from 'antd';
import moment from 'moment';
import axios from 'axios';

const { Option } = Select;

function EmployeeForm(props) {
  const [loadingData, setLoadingData] = useState(false);
  const [nik, setNik] = useState('');
  const [fullName, setFullName] = useState('');
  const [divisionId, setDivisionId] = useState('');
  // const [divisionName, setDivisionName] = useState('');
  const [startHours, setStartHours] = useState('');
  const [finishHours, setFinishHours] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [sex, setSex] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [dataDivision, setDataDivision] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {

    const fetchDivision = async () => {
      try {
        const response = await axios.get(`divisions/`);
        setDataDivision(response.data);
      } catch (error) {
        notification.error({
          message: 'Error get division',
          description: error.response,
        });
      }
    }

    const fetchEmployee = async () => {
      setLoadingData(true);

      try {
        const response = await axios.get(`employees/${props.data}`);
        // setData(response.data);
        setLoadingData(false);
        setNik(response.data.nik);
        setFullName(response.data.fullname);
        setDivisionId(response.data.division.id);
        // setDivisionName(response.data.division.division_name);
        setStartHours(response.data.division.work_hours.starting_hours);
        setFinishHours(response.data.division.work_hours.finish_hours);
        setAddress(response.data.address);
        setPhone(response.data.phone);
        setSex(response.data.sex);
        setBirthDate(response.data.birth_date);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: error.response,
          isLoadingData: false,
        });
        setLoadingData(false);
      }
    }

    fetchDivision();
    if (props.data) {
      fetchEmployee();
    }
  }, [props.data]);

  const handleSubmit = (values, status) => {
    // console.log('Received values of form: ', values);
    // console.log('status', status);

    // setLoadingData(true);
    const data = {
      nik: values.nik,
      fullname: values.fullName,
      address: values.address,
      phone: values.phone,
      sex: values.sex,
      birth_date: values.birthDate,
      division: {
        id: values.divisionId,
      }
    }

    if (status === 'create') {
      props.onCreate(data)
    } else {
      props.onUpdate(data)
    }
  };

  const handleChangeDivision = (value) => {
    const format = 'HH:mm';
    let id_division = value;
    const selectedDivision = dataDivision.filter((division) => {
      return division.id === id_division;
    })
    form.setFieldsValue({
      startHours: moment(selectedDivision[0].work_hours.starting_hours, format),
      finishHours: moment(selectedDivision[0].work_hours.finish_hours, format),
    })
  }

  const ViewForm = () => {
    const format = 'HH:mm';
    // const [form] = Form.useForm();
    if (props.status === 'view' || props.status === 'edit') {
      form.setFieldsValue({
        nik,
        fullName,
        address,
        phone,
        sex,
        birthDate,
        divisionId,
        startHours: moment(startHours, format),
        finishHours: moment(finishHours, format),
      })
    }
    
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    return (
      <Form
        form={form}
        layout="vertical"
        hideRequiredMark
        // initialValues={ props.status !== 'view' ? {workType: 'normal'} : null}
      >
        <Row>
          <Col span={24} >
            <Form.Item
              label="NIK"
              name="nik"
              rules={[{ required: true, message: 'Please input NIK!' }]}
            >
              <Input 
                // onChange={this.handleChange} 
                disabled={props.status === 'view' ? true : false} 
              />
            </Form.Item>

            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: 'Please input Full Name' }]}
            >
              <Input 
                // onChange={this.handleChange} 
                disabled={props.status === 'view' ? true : false} 
              />
            </Form.Item>

            <Form.Item
              label="Phone number"
              name="phone"
              rules={[{ required: true, message: 'Please input Phone Number' }]}
            >
              <Input 
                // onChange={this.handleChange} 
                disabled={props.status === 'view' ? true : false} 
              />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="sex"
              rules={[{ required: true, message: 'Please select Gender!' }]}
            >
              <Select defaultValue="male" disabled={props.status === 'view' ? true : false} style={{ width: 120 }} 
                // onChange={this.handleChange}
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input Address' }]}
            >
              <Input.TextArea 
                // onChange={this.handleChange} 
                rows={4}
                disabled={props.status === 'view' ? true : false} 
              />
            </Form.Item>

            <Form.Item
              label="Division"
              name="divisionId"
              rules={[{ required: true, message: 'Please select Division!' }]}
            >
              <Select
                showSearch 
                disabled={props.status === 'view' ? true : false} 
                style={{ width: 120 }} 
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={handleChangeDivision}
              >
                {
                  dataDivision.map(division => {
                    return (
                      <Option value={division.id} key={division.id}>{division.division_name}</Option>
                    )
                  })
                }
              </Select>
            </Form.Item>

            <Form.Item
              label="Start hours"
              name="startHours"
              {...config}
            >
              
              <TimePicker
                format={format}
                disabled
              />
            </Form.Item>

            <Form.Item
              label="Finish hours"
              name="finishHours"
              {...config}
            >
              
              <TimePicker
                format={format}
                disabled
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

export default EmployeeForm;