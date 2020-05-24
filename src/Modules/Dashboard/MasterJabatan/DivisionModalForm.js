import React, { Component } from 'react';
import { Modal, Form, Input, Row, Col, Select, notification, Spin, Button } from 'antd';
import axios from 'axios';
// import s from '../Master.module.scss';

const { Option } = Select;

class DivisionModalForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingData: false,
      data: [],
      modalVisible: false,
      disabledForm: false,
      divisionName: '',
      totalJamKerja: '',
      totalHours: '',
      workType: '',
      startHours: '',
      finishHours: '',
    }
  }

  componentDidMount() {
    if (this.props.data) {
      this.fetchDivision(this.props.data);
    }
  }

  componentDidUpdate(prevProps, prevState){ 
    if (this.props.data && prevProps.data !== this.props.data) {
      this.fetchDivision(this.props.data);
      if (this.props.status === 'view') {
        this.setState({ disabledForm: true })
      }
    }
  }

  fetchDivision = (id) => {
    this.setState({ isLoadingData: true });
    axios.get(`divisions/${id}`)
      .then(res => {
        // console.log('res', res.data);
        this.setState({
          data: res.data,
          isLoadingData: false,
          divisionName: res.data.division_name,
          totalJamKerja: res.data.total_jam_kerja,
          workType: res.data.work_hours.work_type,
          totalHours: res.data.work_hours.total_hours,
          startHours: res.data.work_hours.starting_hours,
          finishHours: res.data.work_hours.finish_hours,
        })
      })
      .catch(err => {
        notification.error({
          message: 'Error',
          description: err.response,
          isLoadingData: false,
        });
        this.setState({
          isLoadingData: false
        })
      })
  }

  handleSubmit = (e, status) => {
    const { form } = this.props;
    // const [form] = Form.useForm();

    form.validateFields()
      .then(values => {
        form.resetFields();
        console.log('Received values of form: ', values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  viewForm = () => {
    const form = this.props.form;
    // const [form] = Form.useForm();
    return (
      <Form
        form={form}
        layout="vertical"
        hideRequiredMark
        onFinish={this.handleSubmit}
        onFinishFailed={this.onFinishFailed}
        initialValues={{ 
          divisionName: this.state.divisionName,
          workType: this.state.workType,
          totalHours: this.state.totalHours,
          startHours: this.state.startHours,
          finishHours: this.state.finishHours
        }}
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
                disabled={this.props.status === 'view' ? true : false} 
              />
            </Form.Item>

            <Form.Item
              label="Work type"
              name="workType"
              rules={[{ required: true, message: 'Please select work type!' }]}
            >
              <Select defaultValue="normal" disabled={this.props.status === 'view' ? true : false} style={{ width: 120 }} 
                // onChange={this.handleChange}
              >
                <Option value="normal">Normal</Option>
                <Option value="free">Free</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Total hours"
              name="totalHours"
              rules={[{ required: true, message: 'Please input total hours!' }]}
            >
              <Input 
                // onChange={this.handleChange} 
                disabled={this.props.status === 'view' ? true : false} />
            </Form.Item>

            <Form.Item
              label="Start hours"
              name="startHours"
            >
              <Input 
                // onChange={this.handleChange} 
                disabled={this.props.status === 'view' ? true : false} />
            </Form.Item>

            <Form.Item
              label="Finish hours"
              name="finishHours"
            >
              <Input 
                // onChange={this.handleChange} 
                disabled={this.props.status === 'view' ? true : false} />
            </Form.Item>

          </Col>
        </Row>
        

      </Form>
    )
  }

  viewModal = () => {
    // const form = this.props.form;
    return (
      <Modal
        key={this.props.modalKey}
        title={this.props.title}
        visible={this.props.visible}
        onOk={(e)=>this.handleSubmit(e, this.props.status)}
        onCancel={this.props.onCancel}
        confirmLoading={this.props.loading}
        // onOk={() => {
        //   form.validateFields()
        //     .then(values => {
        //       form.resetFields();
        //       this.handleSubmit(values);
        //     })
        //     .catch(info => {
        //       console.log('Validate Failed:', info);
        //     });
        // }}
        // footer={
        //   this.props.status === 'view' ?
        //   [
        //     <Button key="back" onClick={this.props.onCancel}>
        //       Close
        //     </Button>
        //   ]
        //   : 
        //   [
        //     <Button key="back" onClick={this.props.onCancel}>
        //       Return
        //     </Button>,
        //     <Button key="submit" type="primary" loading={this.props.loading} onClick={(values)=>this.handleSubmit(values)}>
        //       Submit
        //     </Button>,
        //   ]
        // }
      >
        {this.state.isLoadingData ? 
          <div className="f mdl f-ctr">
            <Spin tip="Loading..." /> 
          </div>
        : 
          this.viewForm()
        }
      </Modal>
    )
  }

  render() {
    return (
      this.viewModal()
    )
  }
}

export default DivisionModalForm;
// export default Form.create({ name: 'DivisionModalForm'})(DivisionModalForm);