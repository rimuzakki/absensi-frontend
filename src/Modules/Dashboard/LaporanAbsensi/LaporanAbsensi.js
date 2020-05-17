import React, { Component } from 'react';
import { Table, Button, DatePicker } from 'antd';
import { SearchOutlined, PrinterOutlined } from '@ant-design/icons';
// import Moment from 'react-moment';
import cx from 'classnames';
import axios from 'axios';
import s from '../Master.module.scss';


class LaporanAbsensi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingData: false,
      data: [],
    }
  }

  componentDidMount() {
    this.fetchEmployee();
  }

  fetchEmployee = () => {
    this.setState({ isLoadingData: true });
    axios.get(`employees/`)
      .then(res => {
        console.log('res', res.data);
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

  handleDateChange = (date, dateString) => {
    console.log(date, dateString);
  }

  viewTable = () => {
    const columns = [
      {
        title: 'NIK',
        dataIndex: 'nik',
        key: 'nik'
      },
      {
        title: 'Name',
        dataIndex: 'fullname',
        key: 'fullname',
        sorter: (a, b) => a.fullname.localeCompare(b.fullname),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Division',
        dataIndex: ['division', 'division_name'],
        key: 'division',
      },
      {
        title: 'Start hour',
        dataIndex: ['division', 'work_hours', 'starting_hours'],
        key: 'starting_hours',
      },
      {
        title: 'Finish hour',
        dataIndex: ['division', 'work_hours', 'finish_hours'],
        key: 'finish_hours',
      },
      {
        title: 'Duration of work hours',
        dataIndex: ['presences', 'work_minutes_duration'],
        key: 'work_minutes_duration'
      }
    ];

    return (
      <div className={s.cardLayout}>
        <div className={s.title}>
          <h3>January presences report </h3>
        </div>

        <Table columns={columns} dataSource={this.state.data} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className={cx('f', s.topSection, s.topLaporan)}>
          <DatePicker onChange={this.handleDateChange} picker="month" style={{ marginRight: 12 }}  />
          <Button type="primary" icon={<SearchOutlined />} />
          <Button type="primary" icon={<PrinterOutlined />} />
        </div>
        {this.viewTable()}
      </div>
    );
  }
}

export default LaporanAbsensi;