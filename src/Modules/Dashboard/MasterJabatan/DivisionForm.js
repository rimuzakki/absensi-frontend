import React, { useState, useEffect } from 'react';
import { 
  Modal, Form, Input, Row, Col, Select, notification, Spin, Button, 
  TimePicker, InputNumber
} from 'antd';
import moment from 'moment';
import axios from 'axios';

const { Option } = Select;

function DivisionForm(props) {
  // const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  // const [modalVisible, setModalVisible] = useState(false);
  // const [disabledForm, setDisabledForm] = useState(false);
  const [divisionName, setDivisionName] = useState('');
  const [totalHours, setTotalHours] = useState('');
  const [workType, setWorkType] = useState('');
  const [startHours, setStartHours] = useState('');
  const [finishHours, setFinishHours] = useState('');

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchDivision = async () => {
      setLoadingData(true);

      try {
        const response = await axios.get(`divisions/${props.data}`);
        // setData(response.data);
        setLoadingData(false);
        setDivisionName(response.data.division_name);
        setTotalHours(response.data.work_hours.total_hours);
        setWorkType(response.data.work_hours.work_type);
        setStartHours(response.data.work_hours.starting_hours);
        setFinishHours(response.data.work_hours.finish_hours);

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
      division_name: values.divisionName,
      work_hours: {
        work_type: values.workType,
        total_hours: values.totalHours,
        starting_hours: values['startHours'].format('HH:mm'),
        finish_hours: values['finishHours'].format('HH:mm'),
      }
    }

    if (status === 'create') {
      props.onCreate(data)
    } else {
      props.onUpdate(data)
    }
  };

  const ViewForm = () => {
    const format = 'HH:mm';
    // const [form] = Form.useForm();
    if (props.status === 'view' || props.status === 'edit') {
      form.setFieldsValue({
        divisionName,
        workType,
        totalHours,
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
        // onFinish={this.handleSubmit}
        // onFinishFailed={this.onFinishFailed}
        // initialValues={{ 
        //   divisionName: divisionName,
        //   workType: workType,
        //   totalHours: totalHours,
        //   startHours: startHours,
        //   finishHours: finishHours
        // }}
        initialValues={ props.status !== 'view' ? {workType: 'normal'} : null}
      >
        <Row>
          <Col span={24} >
            <Form.Item
              label="Name"
              name="divisionName"
              rules={[{ required: true, message: 'Please input division name!' }]}
            >
              <Input 
                // onChange={this.handleChange} 
                disabled={props.status === 'view' ? true : false} 
              />
            </Form.Item>

            <Form.Item
              label="Work type"
              name="workType"
              rules={[{ required: true, message: 'Please select work type!' }]}
            >
              <Select defaultValue="normal" disabled={props.status === 'view' ? true : false} style={{ width: 120 }} 
                // onChange={this.handleChange}
              >
                <Option value="normal">Normal</Option>
                <Option value="free">Free</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Total hours (hours)"
              name="totalHours"
              rules={[{ required: true, message: 'Please input total hours!' }]}
            >
              <InputNumber 
                // onChange={this.handleChange} 
                disabled={props.status === 'view' ? true : false} />
            </Form.Item>

            <Form.Item
              label="Start hours"
              name="startHours"
              {...config}
            >
              
              <TimePicker
                format={format}
                disabled={props.status === 'view' ? true : false}
              />
            </Form.Item>

            <Form.Item
              label="Finish hours"
              name="finishHours"
              {...config}
            >
              
              <TimePicker
                format={format}
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

export default DivisionForm;