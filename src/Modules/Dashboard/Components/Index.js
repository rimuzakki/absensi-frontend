import React, { Component } from 'react';
import { Table} from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
// import cx from 'classnames';
import axios from 'axios';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {setBreadcrumb} from '../../../Redux/Actions';
import s from '../Master.module.scss';


class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingData: false,
      data: [],
    }
  }

  componentDidMount() {
    this.fetchEmployee();
    this.props.setBreadcrumb('Dashboard');
  }

  fetchEmployee = () => {
    this.setState({ isLoadingData: true });
    axios.get(`presences/`)
      .then(res => {
        // console.log('res', res.data);
        this.setState({
          data: res.data,
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
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
    ];


    return (
      <div className={s.cardLayout}>
        <div className={s.title}>
          <h3>Todays presence</h3>
        </div>

        <Table columns={columns} dataSource={this.state.data} scroll={{ y: 380 }} />
      </div>
    )
  }

  viewCard = () => {
    return (
      <div className={s.cardSection}>
        <div className={s.card}>
          <h3><CheckCircleOutlined /> Already presence</h3>
          <p>10 <small>employee(s)</small></p>
        </div>

        <div className={s.card}>
          <h3><ClockCircleOutlined /> Not presence yet</h3>
          <p>5 <small>employee(s)</small></p>
        </div>

        <div className={s.card}>
          <h3><ExclamationCircleOutlined /> Late</h3>
          <p>2 <small>employee(s)</small></p>
        </div>

        <div className={s.card}>
          <h3><PlusCircleOutlined /> Total employee</h3>
          <p>15 <small>employee(s)</small></p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.viewCard()}
        {this.viewTable()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    breadcrumb: state.breadcrumb,
  }
}

export default connect(mapStateToProps, { setBreadcrumb })(Index);