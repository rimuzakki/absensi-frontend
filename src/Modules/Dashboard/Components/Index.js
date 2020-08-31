import React, { Component } from 'react';
import { Table, Row, Col } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
// import cx from 'classnames';
import axios from 'axios';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import {setBreadcrumb} from '../../../Redux/Actions';
import s from '../Master.module.scss';
import Container from '../../../Layout/Container/Container';
import _ from 'lodash';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingData: false,
      dataPresence: [],
      dataEmployee: [],
    }
  }

  componentDidMount() {
    this.fetchPresence();
    this.fetchEmployees();
    this.props.setBreadcrumb('Dashboard');
  }

  fetchPresence = (today = true) => {
    this.setState({ isLoadingData: true });
    const dateIn = moment().format('YYYY-MM-DD');
    let param = `presences/`;
    if (today) {
      param = `presences?presence_date=${dateIn}`;
    }
    axios.get(param)
      .then(res => {
        // console.log('res', res.data);
        this.setState({
          dataPresence: res.data,
          isLoadingData: false,
        })
      })
      .catch(err => {
        this.setState({
          isLoadingData: false
        })
      })
  }

  fetchEmployees = () => {
    this.setState({ isLoadingData: true });
    axios.get(`employees/`)
      .then(res => {
        console.log('res', res.data);
        this.setState({
          dataEmployee: res.data,
          isLoadingData: false,
        })
      })
      .catch(err => {
        this.setState({
          isLoadingData: false
        })
      })
  }

  handleView = () => {

  }

  handleEdit = () => {

  }

  handleDelete = () => {

  }

  viewTable = () => {
    const columns = [
      {
        title: 'ID Presence',
        dataIndex: 'id_presence',
        key: 'id_presence'
      },
      {
        title: 'Name',
        dataIndex: ['employee', 'fullname'],
        key: 'name',
        sorter: (a, b) => a.fullname.localeCompare(b.fullname),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Start hour',
        dataIndex: 'time_in',
        key: 'time_in',
        render: text => <span><Moment format="HH:mm" parse="HH:mm">{text}</Moment></span>,
      },
      {
        title: 'Finish hour',
        dataIndex: 'time_out',
        key: 'time_out',
        render: text => <span><Moment format="HH:mm" parse="HH:mm">{text}</Moment></span>,
      },
      {
        title: 'Minutes late',
        dataIndex: 'minutes_late',
        key: 'minutes_late',
      },
    ];
    
    let uniqueId = 0;

    return (
      <div className={s.cardLayout}>
        <div className={s.title}>
          <h3>Todays presence</h3>
        </div>

        <Table 
          columns={columns} 
          dataSource={this.state.dataPresence} 
          scroll={{ y: 380 }} 
          rowKey={(record) => {
            if (!record.__uniqueId)
              record.__uniqueId = ++uniqueId;
            return record.__uniqueId;
          }}  
        />
      </div>
    )
  }

  viewCard = () => {
    const { dataPresence, dataEmployee } = this.state;
    const alradyPresence = dataPresence.length;
    const notPresence = dataEmployee.length - dataPresence.length;
    const lateCount = _.filter(dataPresence, function(o) {
      return o.minutes_late >= 30
    })
    const totalEmployee = dataEmployee.length;
    return (
      <div className={s.cardSection}>
        <Row gutter={16}>
          <Col span={6}>
            <div className={s.card}>
              <h3><CheckCircleOutlined /> Already presence</h3>
              <p>{alradyPresence} <small>employee(s)</small></p>
            </div>
          </Col>

          <Col span={6}>
            <div className={s.card}>
              <h3><ClockCircleOutlined /> Not presence yet</h3>
              <p>{notPresence} <small>employee(s)</small></p>
            </div>
          </Col>

          <Col span={6}>
            <div className={s.card}>
              <h3><ExclamationCircleOutlined />{`Late > 30 minutes`}</h3>
              <p>{lateCount ? lateCount.length : 0} <small>employee(s)</small></p>
            </div>
          </Col>

          <Col span={6}>
          <div className={s.card}>
            <h3><PlusCircleOutlined /> Total employee</h3>
            <p>{totalEmployee} <small>employee(s)</small></p>
          </div>
          </Col>

        </Row>
      </div>
    )
  }

  render() {
    return (
      <Container>
        {this.viewCard()}
        {this.viewTable()}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    breadcrumb: state.breadcrumb,
  }
}

export default connect(mapStateToProps, { setBreadcrumb })(Index);